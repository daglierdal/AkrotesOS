import { PrismaClient, ProjectStatus, UserRole } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting seed...');

  // Create tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Akrotes Mimarlik',
      slug: 'akrotes',
      plan: 'ENTERPRISE',
    },
  });
  console.log('Created tenant:', tenant.id);

  // Create admin user
  const passwordHash = await bcrypt.hash('akrotes2026', 10);
  const adminUser = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: 'admin@akrotes.com.tr',
      passwordHash,
      name: 'Admin User',
      role: UserRole.ADMIN,
    },
  });
  console.log('Created admin user:', adminUser.id);

  // Create a regular user for project member
  const regularUser = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: 'user@akrotes.com.tr',
      passwordHash: await bcrypt.hash('user2026', 10),
      name: 'Regular User',
      role: UserRole.USER,
    },
  });
  console.log('Created regular user:', regularUser.id);

  // Create 2 customers
  const customer1 = await prisma.customer.create({
    data: {
      tenantId: tenant.id,
      name: 'Mavi Magazacilik A.S.',
      email: 'procurement@mavi.com',
      phone: '+90 212 555 0001',
      address: 'Istanbul, Turkey',
      taxNumber: '1234567890',
    },
  });
  console.log('Created customer 1:', customer1.id);

  const customer2 = await prisma.customer.create({
    data: {
      tenantId: tenant.id,
      name: 'Koton Perakende A.S.',
      email: 'projects@koton.com',
      phone: '+90 212 555 0002',
      address: 'Istanbul, Turkey',
      taxNumber: '0987654321',
    },
  });
  console.log('Created customer 2:', customer2.id);

  // Create 2 projects
  const project1 = await prisma.project.create({
    data: {
      tenantId: tenant.id,
      customerId: customer1.id,
      name: 'Mavi Istiklal Caddesi Magaza',
      description: 'Yenileme ve fit-out projesi',
      status: ProjectStatus.DRAFT,
      budget: 1500000.00,
      startDate: new Date('2026-04-01'),
      endDate: new Date('2026-06-30'),
    },
  });
  console.log('Created project 1:', project1.id);

  const project2 = await prisma.project.create({
    data: {
      tenantId: tenant.id,
      customerId: customer2.id,
      name: 'Koton Zorlu Center',
      description: 'Yeni magaza acilisi',
      status: ProjectStatus.ACTIVE,
      budget: 2500000.00,
      startDate: new Date('2026-03-15'),
      endDate: new Date('2026-05-15'),
    },
  });
  console.log('Created project 2:', project2.id);

  // Add 1 member to project1
  const member = await prisma.projectMember.create({
    data: {
      projectId: project1.id,
      userId: regularUser.id,
      role: 'member',
    },
  });
  console.log('Created project member:', member.id);

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
