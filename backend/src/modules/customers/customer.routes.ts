import { Router, Request, Response } from 'express';
import { CustomerService } from './customer.service';
import { authMiddleware } from '../../middleware/auth.middleware';
import { tenantMiddleware } from '../../middleware/tenant.middleware';

const router = Router();
const customerService = new CustomerService();

// GET /api/customers - List all customers
router.get('/', authMiddleware, tenantMiddleware, async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId!;
    const customers = await customerService.findAll(tenantId);
    res.json({ success: true, data: customers });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch customers' });
  }
});

// GET /api/customers/:id - Get customer by ID
router.get('/:id', authMiddleware, tenantMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const tenantId = req.tenantId!;
    const customer = await customerService.findById(id, tenantId);
    
    if (!customer) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }
    
    res.json({ success: true, data: customer });
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch customer' });
  }
});

// POST /api/customers - Create new customer
router.post('/', authMiddleware, tenantMiddleware, async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId!;
    const { name, email, phone, notes } = req.body;
    
    if (!name) {
      return res.status(400).json({ success: false, error: 'Name is required' });
    }
    
    const customer = await customerService.create(tenantId, {
      name,
      email,
      phone,
      notes,
    });
    
    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ success: false, error: 'Failed to create customer' });
  }
});

// PUT /api/customers/:id - Update customer
router.put('/:id', authMiddleware, tenantMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const tenantId = req.tenantId!;
    const { name, email, phone, notes } = req.body;
    
    const customer = await customerService.update(id, tenantId, {
      name,
      email,
      phone,
      notes,
    });
    
    if (!customer) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }
    
    res.json({ success: true, data: customer });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ success: false, error: 'Failed to update customer' });
  }
});

// DELETE /api/customers/:id - Delete customer
router.delete('/:id', authMiddleware, tenantMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const tenantId = req.tenantId!;
    
    const deleted = await customerService.delete(id, tenantId);
    
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }
    
    res.json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ success: false, error: 'Failed to delete customer' });
  }
});

export default router;
