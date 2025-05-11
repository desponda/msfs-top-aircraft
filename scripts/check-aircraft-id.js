const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const id = '05354448-83b4-4bb3-96ad-a0a2da2333e6';

async function main() {
  const aircraft = await prisma.aircraft.findUnique({ where: { id } });
  if (aircraft) {
    console.log('FOUND:', aircraft);
  } else {
    console.log('NOT FOUND:', id);
  }
  await prisma.$disconnect();
}

main(); 