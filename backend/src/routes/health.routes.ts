import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

router.get('/db', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
      error: (err as any).message,
    });
  }
});

export default router;
