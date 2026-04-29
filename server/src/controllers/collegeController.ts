import { Request, Response, NextFunction } from 'express';
import pool from '../config/db';
import { createError } from '../middleware/errorHandler';

export const getColleges = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      search = '',
      state = '',
      type = '',
      minFees = '0',
      maxFees = '10000000',
      course = '',
      page = '1',
      limit = '9',
    } = req.query as Record<string, string>;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const offset = (pageNum - 1) * limitNum;

    const conditions: string[] = ['c.fees_max >= $1', 'c.fees_min <= $2'];
    const params: (string | number)[] = [parseInt(minFees), parseInt(maxFees)];
    let paramIdx = 3;

    if (search) {
      conditions.push(`c.name ILIKE $${paramIdx}`);
      params.push(`%${search}%`);
      paramIdx++;
    }
    if (state) {
      conditions.push(`c.state ILIKE $${paramIdx}`);
      params.push(`%${state}%`);
      paramIdx++;
    }
    if (type) {
      conditions.push(`c.type = $${paramIdx}`);
      params.push(type);
      paramIdx++;
    }
    if (course) {
      conditions.push(
        `EXISTS (SELECT 1 FROM courses cr WHERE cr.college_id = c.id AND cr.name ILIKE $${paramIdx})`
      );
      params.push(`%${course}%`);
      paramIdx++;
    }

    const whereClause = `WHERE ${conditions.join(' AND ')}`;

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM colleges c ${whereClause}`,
      params
    );
    const total = parseInt(countResult.rows[0].count);

    const result = await pool.query(
      `SELECT c.* FROM colleges c ${whereClause} ORDER BY c.rating DESC, c.name ASC
       LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`,
      [...params, limitNum, offset]
    );

    res.json({
      success: true,
      data: {
        colleges: result.rows,
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getCollegeById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const collegeResult = await pool.query('SELECT * FROM colleges WHERE id=$1', [id]);
    if (collegeResult.rows.length === 0) {
      return next(createError('College not found', 404));
    }

    const coursesResult = await pool.query(
      'SELECT * FROM courses WHERE college_id=$1 ORDER BY name',
      [id]
    );

    res.json({
      success: true,
      data: {
        college: collegeResult.rows[0],
        courses: coursesResult.rows,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getStates = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await pool.query(
      'SELECT DISTINCT state FROM colleges ORDER BY state'
    );
    res.json({ success: true, data: { states: result.rows.map((r) => r.state) } });
  } catch (err) {
    next(err);
  }
};
