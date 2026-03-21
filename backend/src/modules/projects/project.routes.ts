import { Router, Request, Response } from 'express';
import { ProjectService } from './project.service';
import { authMiddleware } from '../../middleware/auth.middleware';
import { tenantMiddleware } from '../../middleware/tenant.middleware';
import { ProjectStatus } from '@prisma/client';

const router = Router();
const projectService = new ProjectService();

// GET /api/projects - List all projects
router.get('/', authMiddleware, tenantMiddleware, async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId!;
    const projects = await projectService.findAll(tenantId);
    res.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch projects' });
  }
});

// GET /api/projects/:id - Get project by ID
router.get('/:id', authMiddleware, tenantMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const tenantId = req.tenantId!;
    const project = await projectService.findById(id, tenantId);
    
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    
    res.json({ success: true, data: project });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch project' });
  }
});

// POST /api/projects - Create new project
router.post('/', authMiddleware, tenantMiddleware, async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId!;
    const { name, description, customerId, budget, startDate, endDate } = req.body;
    
    if (!name) {
      return res.status(400).json({ success: false, error: 'Name is required' });
    }
    
    const project = await projectService.create(tenantId, {
      name,
      description,
      customerId,
      budget: budget ? parseFloat(budget) : undefined,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    });
    
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ success: false, error: 'Failed to create project' });
  }
});

// PUT /api/projects/:id - Update project
router.put('/:id', authMiddleware, tenantMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const tenantId = req.tenantId!;
    const { name, description, customerId, budget, startDate, endDate } = req.body;
    
    const project = await projectService.update(id, tenantId, {
      name,
      description,
      customerId,
      budget: budget ? parseFloat(budget) : undefined,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    });
    
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    
    res.json({ success: true, data: project });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ success: false, error: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id - Delete project
router.delete('/:id', authMiddleware, tenantMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const tenantId = req.tenantId!;
    
    const deleted = await projectService.delete(id, tenantId);
    
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ success: false, error: 'Failed to delete project' });
  }
});

// PATCH /api/projects/:id/status - Update project status
router.patch('/:id/status', authMiddleware, tenantMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const tenantId = req.tenantId!;
    const { status, reason } = req.body;
    
    if (!status || !Object.values(ProjectStatus).includes(status)) {
      return res.status(400).json({ 
        success: false, 
        error: `Invalid status. Allowed values: ${Object.values(ProjectStatus).join(', ')}` 
      });
    }
    
    const result = await projectService.updateStatus(id, tenantId, { status, reason });
    
    if (!result.success) {
      return res.status(400).json({ success: false, error: result.error });
    }
    
    res.json({ success: true, data: result.project });
  } catch (error) {
    console.error('Error updating project status:', error);
    res.status(500).json({ success: false, error: 'Failed to update project status' });
  }
});

export default router;
