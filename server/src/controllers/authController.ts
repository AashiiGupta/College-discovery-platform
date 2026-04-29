import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db';
import { signToken } from '../utils/jwt';
import { createError } from '../middleware/errorHandler';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(createError('Name, email and password are required', 400));
    }
    if (password.length < 6) {
      return next(createError('Password must be at least 6 characters', 400));
    }

    const existing = await pool.query('SELECT id FROM users WHERE email=$1', [email]);
    if (existing.rows.length > 0) {
      return next(createError('Email already registered', 409));
    }

    const password_hash = await bcrypt.hash(password, 12);
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1,$2,$3) RETURNING id, name, email, created_at',
      [name, email, password_hash]
    );

    const user = result.rows[0];
    const token = signToken({ userId: user.id, email: user.email });

    res.status(201).json({ success: true, data: { user, token } });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError('Email and password are required', 400));
    }

    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (result.rows.length === 0) {
      return next(createError('Invalid email or password', 401));
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return next(createError('Invalid email or password', 401));
    }

    const token = signToken({ userId: user.id, email: user.email });
    const { password_hash: _, ...safeUser } = user;

    res.json({ success: true, data: { user: safeUser, token } });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, created_at FROM users WHERE id=$1',
      [req.user?.userId]
    );
    if (result.rows.length === 0) {
      return next(createError('User not found', 404));
    }
    res.json({ success: true, data: { user: result.rows[0] } });
  } catch (err) {
    next(err);
  }
};
