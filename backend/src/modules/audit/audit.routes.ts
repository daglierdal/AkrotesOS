import { Router, Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { authMiddleware } from '../../middleware/auth.middleware';
import { requireRole } from '../../middleware/rbac.middleware';

const router = Router();

router.get('/', authMiddleware, requireRole(['ADMIN', 'SUPER_ADMIN']), async (req: Request, res: Response) => {
  try {
    const {
      page = '1',
      limit = '20',
      action,
      entity,
      startDate,
      endDate,
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {
      tenantId: req.tenantId,
    };

    if (action) where.action = action;
    if (entity) where.entity = entity;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate as string);
      if (endDate) where.createdAt.lte = new Date(endDate as string);
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, name: true, email: true } },
        },
      }),
      prisma.auditLog.count({ where }),
    ]);

    res.json({
      logs,
      pagination: {
        page: parseInt(page as string),
        limit: take,
        total,
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
