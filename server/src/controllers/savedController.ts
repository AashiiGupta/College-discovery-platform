import { Request, Response, NextFunction } from 'express';
import pool from '../config/db';
import { createError } from '../middleware/errorHandler';

export const getSavedColleges = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const result = await pool.query(
      `SELECT c.*, sc.created_at AS saved_at
       FROM saved_colleges sc
       JOIN colleges c ON sc.college_id = c.id
       WHERE sc.user_id = $1
       ORDER BY sc.created_at DESC`,
      [userId]
    );
    res.json({ success: true, data: { colleges: result.rows } });
  } catch (err) {
    next(err);
  }
};

export const saveCollege = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { collegeId } = req.body;

    if (!collegeId) return next(createError('collegeId is required', 400));

    const college = await pool.query('SELECT id FROM colleges WHERE id=$1', [collegeId]);
    if (college.rows.length === 0) return next(createError('College not found', 404));

    await pool.query(
      'INSERT INTO saved_colleges (user_id, college_id) VALUES ($1,$2) ON CONFLICT DO NOTHING',
      [userId, collegeId]
    );
    res.status(201).json({ success: true, message: 'College saved' });
  } catch (err) {
    next(err);
  }
};

export const unsaveCollege = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { collegeId } = req.params;

    await pool.query(
      'DELETE FROM saved_colleges WHERE user_id=$1 AND college_id=$2',
      [userId, collegeId]
    );
    res.json({ success: true, message: 'College removed from saved' });
  } catch (err) {
    next(err);
  }
};

export const getSavedIds = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const result = await pool.query(
      'SELECT college_id FROM saved_colleges WHERE user_id=$1',
      [userId]
    );
    res.json({
      success: true,
      data: { savedIds: result.rows.map((r) => r.college_id) },
    });
  } catch (err) {
    next(err);
  }
};
