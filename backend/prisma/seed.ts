import { PrismaClient, ProjectStatus, UserRole, Decimal } from '@prisma/client';
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

  // Create or update tenant
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'akrotes' },
    update: {},
    create: {
      name: 'Akrotes Mimarlik',
      slug: 'akrotes',
      plan: 'ENTERPRISE',
    },
  });
  console.log('Created/Updated tenant:', tenant.id);

  // Create or update admin user
  const passwordHash = await bcrypt.hash('akrotes2026', 10);
  const adminUser = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: 'admin@akrotes.com.tr' } },
    update: {},
    create: {
      tenantId: tenant.id,
      email: 'admin@akrotes.com.tr',
      passwordHash,
      name: 'Admin User',
      role: UserRole.ADMIN,
    },
  });
  console.log('Created/Updated admin user:', adminUser.id);

  // Create or update regular user
  const regularUser = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: 'user@akrotes.com.tr' } },
    update: {},
    create: {
      tenantId: tenant.id,
      email: 'user@akrotes.com.tr',
      passwordHash: await bcrypt.hash('user2026', 10),
      name: 'Regular User',
      role: UserRole.USER,
    },
  });
  console.log('Created/Updated regular user:', regularUser.id);

  // Create or update customers
  const customer1 = await prisma.customer.upsert({
    where: { id: '00000000-0000-0000-0000-000000000011' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000011',
      tenantId: tenant.id,
      name: 'Mavi Magazacilik A.S.',
      email: 'procurement@mavi.com',
      phone: '+90 212 555 0001',
      address: 'Istanbul, Turkey',
    },
  });
  console.log('Created/Updated customer 1:', customer1.id);

  const customer2 = await prisma.customer.upsert({
    where: { id: '00000000-0000-0000-0000-000000000012' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000012',
      tenantId: tenant.id,
      name: 'Koton Perakende A.S.',
      email: 'projects@koton.com',
      phone: '+90 212 555 0002',
      address: 'Istanbul, Turkey',
    },
  });
  console.log('Created/Updated customer 2:', customer2.id);

  // Create or update projects
  const project1 = await prisma.project.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
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
  console.log('Created/Updated project 1:', project1.id);

  const project2 = await prisma.project.upsert({
    where: { id: '00000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000002',
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
  console.log('Created/Updated project 2:', project2.id);

  // Add member to project1
  const member = await prisma.projectMember.upsert({
    where: {
      projectId_userId: {
        projectId: project1.id,
        userId: regularUser.id,
      },
    },
    update: {},
    create: {
      projectId: project1.id,
      userId: regularUser.id,
      role: 'member',
    },
  });
  console.log('Created/Updated project member:', member.id);

  // Create BOQ data for project1
  // İnşaat Disiplini
  const discipline = await prisma.discipline.upsert({
    where: { id: '00000000-0000-0000-0000-000000000021' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000021',
      projectId: project1.id,
      name: "İnşaat",
      code: "INS",
      sortOrder: 1,
      tenantId: project1.tenantId,
    },
  });
  console.log('Created/Updated discipline:', discipline.id);

  // 01-YIKIM VE SÖKÜM
  const section1 = await prisma.section.upsert({
    where: { id: '00000000-0000-0000-0000-000000000031' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000031',
      disciplineId: discipline.id,
      name: "01-YIKIM VE SÖKÜM",
      code: "01",
      sortOrder: 1,
      tenantId: project1.tenantId,
    },
  });
  console.log('Created/Updated section 1:', section1.id);

  // POZ 01.01: Duvar Yıkım
  const item1 = await prisma.bOQItem.upsert({
    where: { id: '00000000-0000-0000-0000-000000000041' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000041',
      sectionId: section1.id,
      pozNo: "01.01",
      description: "Duvar Yıkım",
      unit: "m²",
      quantity: new Decimal("120"),
      materialUnitPrice: new Decimal("35.00"),
      laborUnitPrice: new Decimal("50.00"),
      totalUnitPrice: new Decimal("85.00"),
      totalPrice: new Decimal("10200.00"),
      vatRate: new Decimal("20"),
      sortOrder: 1,
      tenantId: project1.tenantId,
    },
  });
  console.log('Created/Updated BOQ item 1:', item1.id);

  // 02-KABA İNŞAAT
  const section2 = await prisma.section.upsert({
    where: { id: '00000000-0000-0000-0000-000000000032' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000032',
      disciplineId: discipline.id,
      name: "02-KABA İNŞAAT",
      code: "02",
      sortOrder: 2,
      tenantId: project1.tenantId,
    },
  });
  console.log('Created/Updated section 2:', section2.id);

  // POZ 02.01: Beton Döküm
  const item2 = await prisma.bOQItem.upsert({
    where: { id: '00000000-0000-0000-0000-000000000042' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000042',
      sectionId: section2.id,
      pozNo: "02.01",
      description: "Beton Döküm",
      unit: "m³",
      quantity: new Decimal("12"),
      materialUnitPrice: new Decimal("450.00"),
      laborUnitPrice: new Decimal("200.00"),
      totalUnitPrice: new Decimal("650.00"),
      totalPrice: new Decimal("7800.00"),
      vatRate: new Decimal("20"),
      sortOrder: 1,
      tenantId: project1.tenantId,
    },
  });
  console.log('Created/Updated BOQ item 2:', item2.id);

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
