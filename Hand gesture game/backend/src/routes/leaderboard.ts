import { Router, Request, Response } from 'express';
import { db } from '../config/firebase';
import { z } from 'zod';

const router = Router();

const COLLECTION = 'leaderboard';
const MAX_ENTRIES = 100; // cap the leaderboard

// ─── Validation Schema ────────────────────────────────────────────────────────
const ScoreSchema = z.object({
  playerName: z
    .string()
    .min(1, 'Name is required')
    .max(30, 'Name must be ≤ 30 characters')
    .trim(),
  score: z
    .number()
    .int()
    .min(0, 'Score must be ≥ 0')
    .max(9999, 'Score too large'),
  level: z.number().int().min(1),
  accuracyPct: z.number().min(0).max(100).default(0),
});

// ─── GET /api/leaderboard — top 20 scores ────────────────────────────────────
router.get('/', async (_req: Request, res: Response) => {
  try {
    const snapshot = await db
      .collection(COLLECTION)
      .orderBy('score', 'desc')
      .limit(20)
      .get();

    const entries = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: (doc.data().createdAt?.toDate() as Date | undefined)?.toISOString() ?? null,
    }));

    res.json({ success: true, data: entries });
  } catch (err) {
    console.error('GET /leaderboard error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch leaderboard' });
  }
});

// ─── POST /api/leaderboard — submit a score ──────────────────────────────────
router.post('/', async (req: Request, res: Response) => {
  const parsed = ScoreSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      error: 'Invalid payload',
      details: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const { playerName, score, level, accuracyPct } = parsed.data;

    // Enforce max leaderboard size — trim oldest low-score entries
    const totalSnapshot = await db.collection(COLLECTION).count().get();
    if (totalSnapshot.data().count >= MAX_ENTRIES) {
      const lowest = await db
        .collection(COLLECTION)
        .orderBy('score', 'asc')
        .limit(1)
        .get();
      if (!lowest.empty) {
        await lowest.docs[0].ref.delete();
      }
    }

    const docRef = await db.collection(COLLECTION).add({
      playerName,
      score,
      level,
      accuracyPct,
      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,
      data: { id: docRef.id, playerName, score, level, accuracyPct },
    });
  } catch (err) {
    console.error('POST /leaderboard error:', err);
    res.status(500).json({ success: false, error: 'Failed to save score' });
  }
});

export default router;
