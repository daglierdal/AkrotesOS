import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import auditRoutes from './modules/audit/audit.routes';
import healthRoutes from './routes/health.routes';
import customerRoutes from './modules/customers/customer.routes';
import projectRoutes from './modules/projects/project.routes';
import projectMemberRoutes from './modules/projects/project-member.routes';
import boqRoutes from './modules/boq/boq.routes';
import { tenantMiddleware } from './middleware/tenant.middleware';
import { authMiddleware } from './middleware/auth.middleware';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Public routes - NO tenant middleware
app.use('/health', healthRoutes);
app.use('/api/auth', authRoutes);

// Protected routes - WITH auth and tenant middleware
app.use(authMiddleware);
app.use(tenantMiddleware);
app.use('/api/audit-logs', auditRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/projects/:id/members', projectMemberRoutes);
app.use('/api', boqRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
