import { Router, Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { auditService } from '../audit/audit.service';

const router = Router();

// GET /api/projects/:projectId/disciplines - Get all disciplines for a project
router.get('/projects/:projectId/disciplines', async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId as string;
    const tenantId = req.tenantId!;
    
    const disciplines = await prisma.discipline.findMany({
      where: { projectId, tenantId },
      include: {
        sections: {
          include: {
            items: true,
          },
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { sortOrder: 'asc' },
    });
    
    res.json(disciplines);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/projects/:projectId/disciplines - Create a new discipline
router.post('/projects/:projectId/disciplines', async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId as string;
    const tenantId = req.tenantId!;
    const { name, code, sortOrder } = req.body;
    
    const discipline = await prisma.discipline.create({
      data: {
        projectId,
        name,
        code,
        sortOrder: sortOrder || 0,
        tenantId,
      },
    });
    
    // Audit log
    await auditService.logAction({
      tenantId,
      userId: req.user?.userId,
      action: 'CREATE',
      entity: 'Discipline',
      entityId: discipline.id,
      newValue: discipline,
      ipAddress: req.ip,
    });
    
    res.status(201).json(discipline);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/disciplines/:disciplineId/sections - Get all sections for a discipline
router.get('/disciplines/:disciplineId/sections', async (req: Request, res: Response) => {
  try {
    const disciplineId = req.params.disciplineId as string;
    const tenantId = req.tenantId!;
    
    const sections = await prisma.section.findMany({
      where: { disciplineId, tenantId },
      include: {
        items: {
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { sortOrder: 'asc' },
    });
    
    res.json(sections);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/disciplines/:disciplineId/sections - Create a new section
router.post('/disciplines/:disciplineId/sections', async (req: Request, res: Response) => {
  try {
    const disciplineId = req.params.disciplineId as string;
    const tenantId = req.tenantId!;
    const { name, code, sortOrder } = req.body;
    
    const section = await prisma.section.create({
      data: {
        disciplineId,
        name,
        code,
        sortOrder: sortOrder || 0,
        tenantId,
      },
    });
    
    // Audit log
    await auditService.logAction({
      tenantId,
      userId: req.user?.userId,
      action: 'CREATE',
      entity: 'Section',
      entityId: section.id,
      newValue: section,
      ipAddress: req.ip,
    });
    
    res.status(201).json(section);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/sections/:sectionId/items - Create a new BOQ item
router.post('/sections/:sectionId/items', async (req: Request, res: Response) => {
  try {
    const sectionId = req.params.sectionId as string;
    const tenantId = req.tenantId!;
    const { 
      pozNo, 
      description, 
      unit, 
      quantity, 
      materialUnitPrice, 
      laborUnitPrice, 
      vatRate, 
      notes 
    } = req.body;
    
    // Server-side calculation
    const totalUnitPrice = Number(materialUnitPrice) + Number(laborUnitPrice);
    const totalPrice = Number(quantity) * totalUnitPrice;
    
    const item = await prisma.bOQItem.create({
      data: {
        sectionId,
        pozNo,
        description,
        unit,
        quantity,
        materialUnitPrice,
        laborUnitPrice,
        totalUnitPrice,
        totalPrice,
        vatRate: vatRate || 20,
        notes: notes || null,
        sortOrder: 0,
        tenantId,
      },
    });
    
    // Audit log
    await auditService.logAction({
      tenantId,
      userId: req.user?.userId,
      action: 'CREATE',
      entity: 'BOQItem',
      entityId: item.id,
      newValue: item,
      ipAddress: req.ip,
    });
    
    res.status(201).json(item);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/items/:itemId - Update a BOQ item
router.put('/items/:itemId', async (req: Request, res: Response) => {
  try {
    const itemId = req.params.itemId as string;
    const tenantId = req.tenantId!;
    const updateData: any = req.body;
    
    // Get current item
    const currentItem = await prisma.bOQItem.findFirst({
      where: { id: itemId, tenantId },
    });
    
    if (!currentItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    // Recalculate prices if material, labor price, or quantity changed
    if (updateData.materialUnitPrice !== undefined || updateData.laborUnitPrice !== undefined || updateData.quantity !== undefined) {
      const mat = updateData.materialUnitPrice !== undefined ? Number(updateData.materialUnitPrice) : Number(currentItem.materialUnitPrice);
      const lab = updateData.laborUnitPrice !== undefined ? Number(updateData.laborUnitPrice) : Number(currentItem.laborUnitPrice);
      updateData.totalUnitPrice = mat + lab;

      const qty = updateData.quantity !== undefined ? Number(updateData.quantity) : Number(currentItem.quantity);
      updateData.totalPrice = qty * updateData.totalUnitPrice;
    }
    
    const item = await prisma.bOQItem.update({
      where: { id: itemId },
      data: updateData,
    });
    
    // Audit log
    await auditService.logAction({
      tenantId,
      userId: req.user?.userId,
      action: 'UPDATE',
      entity: 'BOQItem',
      entityId: item.id,
      oldValue: currentItem,
      newValue: item,
      ipAddress: req.ip,
    });
    
    res.json(item);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/items/:itemId - Delete a BOQ item
router.delete('/items/:itemId', async (req: Request, res: Response) => {
  try {
    const itemId = req.params.itemId as string;
    const tenantId = req.tenantId!;
    
    const currentItem = await prisma.bOQItem.findFirst({
      where: { id: itemId, tenantId },
    });
    
    if (!currentItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    await prisma.bOQItem.delete({
      where: { id: itemId },
    });
    
    // Audit log
    await auditService.logAction({
      tenantId,
      userId: req.user?.userId,
      action: 'DELETE',
      entity: 'BOQItem',
      entityId: itemId,
      oldValue: currentItem,
      ipAddress: req.ip,
    });
    
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/projects/:projectId/summary - Get project summary
router.get('/projects/:projectId/summary', async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId as string;
    const tenantId = req.tenantId!;
    
    const disciplines = await prisma.discipline.findMany({
      where: { projectId, tenantId },
      include: {
        sections: {
          include: {
            items: true,
          },
        },
      },
    });
    
    interface SummaryItem {
      disciplineId: string;
      disciplineName: string;
      totalMaterial: number;
      totalLabor: number;
      totalPrice: number;
      itemCount: number;
    }
    
    const summary: SummaryItem[] = disciplines.map((disc) => {
      const items = disc.sections.flatMap((sec: any) => sec.items);
      const totalMaterial = items.reduce(
        (sum: number, item: any) => sum + (Number(item.materialUnitPrice) * Number(item.quantity)),
        0
      );
      const totalLabor = items.reduce(
        (sum: number, item: any) => sum + (Number(item.laborUnitPrice) * Number(item.quantity)),
        0
      );
      const totalPrice = items.reduce(
        (sum: number, item: any) => sum + Number(item.totalPrice),
        0
      );
      
      return {
        disciplineId: disc.id,
        disciplineName: disc.name,
        totalMaterial,
        totalLabor,
        totalPrice,
        itemCount: items.length,
      };
    });
    
    const grandTotal = summary.reduce((sum: number, d: SummaryItem) => sum + d.totalPrice, 0);
    
    res.json({
      projectId,
      disciplines: summary,
      grandTotal,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
