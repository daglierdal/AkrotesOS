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

  // 3. Demo Proje
  const project = await prisma.project.upsert({
    where: { id: 'demo-project-1' },
    update: {},
    create: {
      id: 'demo-project-1',
      tenantId: tenant.id,
      name: 'MACFit Yeni Kulüp Açılışı',
      status: 'ACTIVE',
      budget: 2500000,
      startDate: new Date('2026-03-01'),
      endDate: new Date('2026-12-31'),
    },
  });

  console.log('✅ Project created:', project.id);
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
