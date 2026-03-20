import prisma from '../../lib/prisma';

interface LogActionParams {
  tenantId: string;
  userId?: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'EXPORT' | 'APPROVE' | 'REJECT';
  entity: string;
  entityId?: string;
  oldValue?: any;
  newValue?: any;
  ipAddress?: string;
}

export class AuditService {
  async logAction(params: LogActionParams) {
    try {
      await prisma.auditLog.create({
        data: {
          tenantId: params.tenantId,
          userId: params.userId,
          action: params.action,
          entity: params.entity,
          entityId: params.entityId,
          oldValue: params.oldValue ? JSON.stringify(params.oldValue) : undefined,
          newValue: params.newValue ? JSON.stringify(params.newValue) : undefined,
          ipAddress: params.ipAddress,
        },
      });
    } catch (err) {
      console.error('Audit log error:', err);
    }
  }
}

export const auditService = new AuditService();
