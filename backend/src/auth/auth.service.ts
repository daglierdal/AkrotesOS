import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

export class AuthService {
  async register(tenantId: string, email: string, password: string, name: string, role: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: {
        tenantId,
        email,
        passwordHash: hashedPassword,
        name,
        role: role as any,
      },
    });
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findFirst({
      where: { email },
      include: { tenant: true },
    });
    if (!user) throw new Error('User not found');

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error('Invalid password');

    const token = jwt.sign(
      { userId: user.id, tenantId: user.tenantId, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
    return { user, token };
  }

  verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!) as any;
  }
}

export const authService = new AuthService();