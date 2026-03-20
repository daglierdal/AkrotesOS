import { Router, Request, Response } from 'express';
import { authService } from '../auth/auth.service';
import { authMiddleware } from '../middleware/auth.middleware';
import prisma from '../lib/prisma';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { tenantId, email, password, name, role } = req.body;
    const user = await authService.register(tenantId, email, password, name, role);
    res.status(201).json({ user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.cookie('akro_token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 86400 * 1000,
      path: '/',
    });
    res.json({ user, token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
});

router.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('akro_token', { sameSite: 'none', secure: true });
  res.json({ message: 'Logged out' });
});

router.get('/me', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: { tenant: true },
    });
    res.json({ user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;