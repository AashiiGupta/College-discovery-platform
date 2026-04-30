import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import collegeRoutes from './routes/colleges';
import savedRoutes from './routes/saved';
import compareRoutes from './routes/compare';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();


// ✅ CORS FIX (works for Vercel + localhost)
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin.includes("vercel.app") ||
        origin.includes("localhost")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ✅ Root route (so "/" doesn’t show error)
app.get("/", (_req, res) => {
  res.send("API is running 🚀");
});


// ✅ Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});


// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/compare', compareRoutes);


// ✅ 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});


// ✅ Global error handler
app.use(errorHandler);


export default app;
