import pool from '../config/db';
import dotenv from 'dotenv';

dotenv.config();

const initDb = async (): Promise<void> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS colleges (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        state VARCHAR(100) NOT NULL,
        fees_min INTEGER NOT NULL,
        fees_max INTEGER NOT NULL,
        rating DECIMAL(2,1) NOT NULL,
        established INTEGER NOT NULL,
        affiliation VARCHAR(255),
        type VARCHAR(50) NOT NULL CHECK (type IN ('Government', 'Private', 'Deemed')),
        placement_avg INTEGER NOT NULL,
        placement_highest INTEGER NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        college_id INTEGER NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        duration VARCHAR(50) NOT NULL,
        fees INTEGER NOT NULL,
        seats INTEGER NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS saved_colleges (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        college_id INTEGER NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, college_id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS compare_history (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        college_ids INTEGER[] NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query('COMMIT');
    console.log('✅ Database schema initialized successfully');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Failed to initialize database schema:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
};

initDb().catch((err) => {
  console.error(err);
  process.exit(1);
});
