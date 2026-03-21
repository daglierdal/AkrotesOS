import { Router, Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { authMiddleware } from '../../middleware/auth.middleware';
import { tenantMiddleware } from '../../middleware/tenant.middleware';

const router = Router({ mergeParams: true });

// POST /api/projects/:id/members - Add member to project
router.post('/', authMiddleware, tenantMiddleware, async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id as string;
    const tenantId = req.tenantId!;
    const { userId, role = 'member' } = req.body;
    
    if (!userId) {
      return res.status(400).json({ success: false, error: 'userId is required' });
    }
    
    // Verify project belongs to tenant
    const project = await prisma.project.findFirst({
      where: { id: projectId, tenantId },
    });
    
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    
    // Verify user belongs to tenant
    const user = await prisma.user.findFirst({
      where: { id: userId, tenantId },
    });
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found in tenant' });
    }
    
    // Check if already a member
    const existingMember = await prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId } },
    });
    
    if (existingMember) {
      return res.status(400).json({ success: false, error: 'User is already a member of this project' });
    }
    
    const member = await prisma.projectMember.create({
      data: {
        projectId,
        userId,
        role,
      },
    });
    
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    console.error('Error adding project member:', error);
    res.status(500).json({ success: false, error: 'Failed to add project member' });
  }
});

// DELETE /api/projects/:id/members/:userId - Remove member from project
router.delete('/:userId', authMiddleware, tenantMiddleware, async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id as string;
    const userId = req.params.userId as string;
    const tenantId = req.tenantId!;
    
    // Verify project belongs to tenant
    const project = await prisma.project.findFirst({
      where: { id: projectId, tenantId },
    });
    
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    
    // Check if member exists
    const member = await prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId } },
    });
    
    if (!member) {
      return res.status(404).json({ success: false, error: 'Member not found in project' });
    }
    
    await prisma.projectMember.delete({
      where: { projectId_userId: { projectId, userId } },
    });
    
    res.json({ success: true, message: 'Member removed from project successfully' });
  } catch (error) {
    console.error('Error removing project member:', error);
    res.status(500).json({ success: false, error: 'Failed to remove project member' });
  }
});

export default router;
