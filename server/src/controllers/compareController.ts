import { Request, Response, NextFunction } from 'express';
import pool from '../config/db';
import { createError } from '../middleware/errorHandler';

export const compareColleges = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { collegeIds } = req.body as { collegeIds: number[] };

    if (!Array.isArray(collegeIds) || collegeIds.length < 2 || collegeIds.length > 3) {
      return next(createError('Please provide 2–3 college IDs to compare', 400));
    }

    const placeholders = collegeIds.map((_, i) => `$${i + 1}`).join(',');
    const collegesResult = await pool.query(
      `SELECT * FROM colleges WHERE id IN (${placeholders}) ORDER BY rating DESC`,
      collegeIds
    );

    const coursesResult = await pool.query(
      `SELECT * FROM courses WHERE college_id IN (${placeholders}) ORDER BY college_id, name`,
      collegeIds
    );

    const coursesByCollege: Record<number, typeof coursesResult.rows> = {};
    for (const course of coursesResult.rows) {
      if (!coursesByCollege[course.college_id]) coursesByCollege[course.college_id] = [];
      coursesByCollege[course.college_id].push(course);
    }

    const colleges = collegesResult.rows.map((c) => ({
      ...c,
      courses: coursesByCollege[c.id] || [],
    }));

    // Save compare history if authenticated
    if (req.user) {
      await pool.query(
        'INSERT INTO compare_history (user_id, college_ids) VALUES ($1, $2)',
        [req.user.userId, collegeIds]
      );
    }

    res.json({ success: true, data: { colleges } });
  } catch (err) {
    next(err);
  }
};

export const getCompareHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const result = await pool.query(
      'SELECT * FROM compare_history WHERE user_id=$1 ORDER BY created_at DESC LIMIT 10',
      [userId]
    );
    res.json({ success: true, data: { history: result.rows } });
  } catch (err) {
    next(err);
  }
};
