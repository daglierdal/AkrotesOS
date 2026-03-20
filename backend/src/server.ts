import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import auditRoutes from './modules/audit/audit.routes';
import { tenantMiddleware } from './middleware/tenant.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(tenantMiddleware);
app.use('/api/auth', authRoutes);
app.use('/api/audit-logs', auditRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});