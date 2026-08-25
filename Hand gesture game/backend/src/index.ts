import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import leaderboardRouter from './routes/leaderboard';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3001;

// ─── Allowed origins ──────────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',        // Vite dev server
  'http://localhost:4173',        // Vite preview
  process.env.FRONTEND_URL ?? '', // Production Vercel URL
].filter(Boolean);

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, same-origin SSR)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin "${origin}" not allowed`));
      }
    },
    methods: ['GET', 'POST'],
    credentials: true,
  })
);
app.use(express.json({ limit: '16kb' }));

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/leaderboard', leaderboardRouter);

// ─── 404 handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// ─── Start server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Memory Moves backend running on http://localhost:${PORT}`);
  console.log(`   • GET  /health`);
  console.log(`   • GET  /api/leaderboard`);
  console.log(`   • POST /api/leaderboard`);
});

export default app;
