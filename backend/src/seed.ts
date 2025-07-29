import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Create default Super Admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  console.log('Created Super Admin user:', {
    id: superAdmin.id,
    email: superAdmin.email,
    role: superAdmin.role,
  });

  // Create a regular user for testing
  const regularUserPassword = await bcrypt.hash('user123', 10);

  const regularUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: regularUserPassword,
      role: 'USER',
    },
  });

  console.log('Created regular user:', {
    id: regularUser.id,
    email: regularUser.email,
    role: regularUser.role,
  });

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
