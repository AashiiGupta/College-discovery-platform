import app from './app';
import pool from './config/db';

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    // Verify DB connection
    await pool.query('SELECT 1');
    console.log('✅ Database connection verified');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📚 API docs: http://localhost:${PORT}/health`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to database:', err);
    process.exit(1);
  }
};

start();
