import { Customer } from '@prisma/client';
import prisma from '../../lib/prisma';

export interface CreateCustomerInput {
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
}

export interface UpdateCustomerInput {
  name?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
}

export class CustomerService {
  async findAll(tenantId: string): Promise<Customer[]> {
    return prisma.customer.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string, tenantId: string): Promise<Customer | null> {
    return prisma.customer.findFirst({
      where: { id, tenantId },
    });
  }

  async create(tenantId: string, data: CreateCustomerInput): Promise<Customer> {
    return prisma.customer.create({
      data: {
        ...data,
        tenantId,
      },
    });
  }

  async update(id: string, tenantId: string, data: UpdateCustomerInput): Promise<Customer | null> {
    const customer = await this.findById(id, tenantId);
    if (!customer) return null;

    return prisma.customer.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, tenantId: string): Promise<boolean> {
    const customer = await this.findById(id, tenantId);
    if (!customer) return false;

    await prisma.customer.delete({
      where: { id },
    });
    return true;
  }
}
