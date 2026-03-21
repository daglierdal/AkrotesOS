import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma';

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Tenant oluştur/güncelle
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'akrotes' },
    update: {},
    create: {
      name: 'Akrotes Mimarlik A.S.',
      slug: 'akrotes',
      plan: 'PRO',
      status: 'active',
    },
  });

  console.log('✅ Tenant created:', tenant.id);

  // 2. Demo Kullanıcılar
  const users = [
    { email: 'admin@akrotes.com.tr', name: 'Erdal Dagli', role: 'ADMIN' },
    { email: 'asiye@akrotes.com.tr', name: 'Asiye Hanım', role: 'PLANLAMA' },
    { email: 'melike@akrotes.com.tr', name: 'Melike Hanım', role: 'SATINALMA' },
    { email: 'erhan@akrotes.com.tr', name: 'Erhan Bey', role: 'TASERON' },
    { email: 'buse@akrotes.com.tr', name: 'Buse Hanım', role: 'HAKEDIS' },
  ];

  const password = 'akrotes2026';
  const hashedPassword = await bcrypt.hash(password, 10);

  for (const user of users) {
    const createdUser = await prisma.user.upsert({
      where: { tenantId_email: { tenantId: tenant.id, email: user.email } },
      update: {},
      create: {
        tenantId: tenant.id,
        email: user.email,
        passwordHash: hashedPassword,
        name: user.name,
        role: user.role as any,
        status: 'active',
      },
    });
    console.log(`✅ User created: ${createdUser.email}`);
  }

  // 3. Demo Müşteriler
  const macfit = await prisma.customer.upsert({
    where: { id: 'demo-customer-macfit' },
    update: {},
    create: {
      id: 'demo-customer-macfit',
      tenantId: tenant.id,
      name: 'MACFit',
      email: 'info@macfit.com.tr',
      phone: '0212555',
      notes: 'Uydu merkezi zincirleri',
    },
  });

  const decathlon = await prisma.customer.upsert({
    where: { id: 'demo-customer-decathlon' },
    update: {},
    create: {
      id: 'demo-customer-decathlon',
      tenantId: tenant.id,
      name: 'Decathlon',
      email: 'contact@decathlon.com.tr',
      phone: '0216777',
      notes: 'Spor malzemeleri perakendesi',
    },
  });

  console.log('✅ Customers created:', macfit.id, decathlon.id);

  // 4. Demo Projeler
  const project1 = await prisma.project.upsert({
    where: { id: 'demo-project-1' },
    update: {},
    create: {
      id: 'demo-project-1',
      tenantId: tenant.id,
      customerId: macfit.id,
      name: 'MACFit Ankara Çankaya',
      description: 'Yeni şube açılışı',
      projectType: 'KESIF',
      status: 'ACTIVE',
      budget: 2500000,
      city: 'Ankara',
      district: 'Çankaya',
      address: 'Çankaya Merkez',
      area: 500,
      startDate: new Date('2026-03-01'),
      endDate: new Date('2026-12-31'),
    },
  });

  const project2 = await prisma.project.upsert({
    where: { id: 'demo-project-2' },
    update: {},
    create: {
      id: 'demo-project-2',
      tenantId: tenant.id,
      customerId: macfit.id,
      name: 'MACFit İstanbul Kadıköy',
      projectType: 'IHALE',
      status: 'DRAFT',
      budget: 3000000,
      city: 'İstanbul',
      district: 'Kadıköy',
      address: 'Kadıköy Merkez',
      area: 750,
    },
  });

  console.log('✅ Projects created:', project1.id, project2.id);

  // 5. Demo Proje Üyeleri
  const planlama = await prisma.user.findFirst({
    where: { tenantId: tenant.id, email: 'asiye@akrotes.com.tr' },
  });

  const satinalma = await prisma.user.findFirst({
    where: { tenantId: tenant.id, email: 'melike@akrotes.com.tr' },
  });

  if (planlama) {
    await prisma.projectMember.upsert({
      where: { projectId_userId: { projectId: project1.id, userId: planlama.id } },
      update: {},
      create: {
        projectId: project1.id,
        userId: planlama.id,
        role: 'PLANLAMA',
      },
    });
    console.log('✅ Project member added: PLANLAMA');
  }

  if (satinalma) {
    await prisma.projectMember.upsert({
      where: { projectId_userId: { projectId: project1.id, userId: satinalma.id } },
      update: {},
      create: {
        projectId: project1.id,
        userId: satinalma.id,
        role: 'SATINALMA',
      },
    });
    console.log('✅ Project member added: SATINALMA');
  }

  console.log('🌱 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
