import { Project, ProjectStatus } from '@prisma/client';
import prisma from '../../lib/prisma';

// Durum geçiş kuralları
const STATUS_TRANSITIONS: Record<ProjectStatus, ProjectStatus[]> = {
  [ProjectStatus.DRAFT]: [ProjectStatus.ACTIVE],
  [ProjectStatus.ACTIVE]: [ProjectStatus.IN_PROGRESS, ProjectStatus.CANCELLED],
  [ProjectStatus.IN_PROGRESS]: [ProjectStatus.COMPLETED, ProjectStatus.CANCELLED],
  [ProjectStatus.COMPLETED]: [], // Son durum, geçiş yok
  [ProjectStatus.CANCELLED]: [ProjectStatus.DRAFT], // Yeniden başlatılabilir
};

export interface CreateProjectInput {
  name: string;
  description?: string;
  customerId?: string;
  projectType?: 'KESIF' | 'IHALE';
  budget?: number;
  startDate?: Date;
  endDate?: Date;
  city?: string;
  district?: string;
  address?: string;
  area?: number;
}

export interface UpdateProjectInput {
  name?: string;
  description?: string;
  customerId?: string;
  projectType?: 'KESIF' | 'IHALE';
  budget?: number;
  startDate?: Date;
  endDate?: Date;
  city?: string;
  district?: string;
  address?: string;
  area?: number;
}

export interface UpdateStatusInput {
  status: ProjectStatus;
  reason?: string;
}

export class ProjectService {
  // Durum geçişinin geçerli olup olmadığını kontrol et
  isValidStatusTransition(currentStatus: ProjectStatus, newStatus: ProjectStatus): boolean {
    if (currentStatus === newStatus) return true;
    const allowedTransitions = STATUS_TRANSITIONS[currentStatus] || [];
    return allowedTransitions.includes(newStatus);
  }

  async findAll(tenantId: string, filters?: { status?: string; customerId?: string; projectType?: string }): Promise<Project[]> {
    const where: any = { tenantId };
    if (filters?.status) where.status = filters.status;
    if (filters?.customerId) where.customerId = filters.customerId;
    if (filters?.projectType) where.projectType = filters.projectType;
    
    return prisma.project.findMany({
      where,
      include: {
        customer: true,
        members: { include: { user: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string, tenantId: string): Promise<Project | null> {
    return prisma.project.findFirst({
      where: { id, tenantId },
      include: {
        customer: true,
        members: { include: { user: true } },
      },
    });
  }

  async create(tenantId: string, data: CreateProjectInput): Promise<Project> {
    return prisma.project.create({
      data: {
        ...data,
        tenantId,
        budget: data.budget ? data.budget : null,
        area: data.area ? data.area : null,
      },
      include: {
        customer: true,
        members: { include: { user: true } },
      },
    });
  }

  async update(id: string, tenantId: string, data: UpdateProjectInput): Promise<Project | null> {
    const project = await this.findById(id, tenantId);
    if (!project) return null;

    return prisma.project.update({
      where: { id },
      data: {
        ...data,
        budget: data.budget ? data.budget : null,
        area: data.area ? data.area : null,
      },
      include: {
        customer: true,
        members: { include: { user: true } },
      },
    });
  }

  async updateStatus(
    id: string,
    tenantId: string,
    data: UpdateStatusInput
  ): Promise<{ success: boolean; project?: Project; error?: string }> {
    const project = await this.findById(id, tenantId);
    if (!project) {
      return { success: false, error: 'Project not found' };
    }

    const currentStatus = project.status;
    const newStatus = data.status;

    if (!this.isValidStatusTransition(currentStatus, newStatus)) {
      return {
        success: false,
        error: `Invalid status transition from ${currentStatus} to ${newStatus}. Allowed transitions: ${STATUS_TRANSITIONS[currentStatus].join(', ') || 'none'}`,
      };
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { status: newStatus },
      include: {
        customer: true,
        members: { include: { user: true } },
      },
    });

    return { success: true, project: updatedProject };
  }

  async delete(id: string, tenantId: string): Promise<boolean> {
    const project = await this.findById(id, tenantId);
    if (!project) return false;

    await prisma.project.delete({
      where: { id },
    });
    return true;
  }
}
