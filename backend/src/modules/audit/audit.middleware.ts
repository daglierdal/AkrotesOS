import { Request, Response, NextFunction } from 'express';
import { auditService } from './audit.service';

export const auditMiddleware = (entity: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json.bind(res);
    
    res.json = function(body: any) {
      res.json = originalJson;
      
      let action: any;
      switch (req.method) {
        case 'POST': action = 'CREATE'; break;
        case 'PUT':
        case 'PATCH': action = 'UPDATE'; break;
        case 'DELETE': action = 'DELETE'; break;
        default: return originalJson(body);
      }

      res.on('finish', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          auditService.logAction({
            tenantId: req.tenantId || req.user?.tenantId,
            userId: req.user?.userId,
            action,
            entity,
            entityId: req.params.id || body?.id,
            newValue: action === 'CREATE' || action === 'UPDATE' ? body : undefined,
            ipAddress: req.ip,
          });
        }
      });

      return originalJson(body);
    };

    next();
  };
};
