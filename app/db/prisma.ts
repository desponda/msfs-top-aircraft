import { PrismaClient } from '@prisma/client';

// Create a singleton Prisma Client instance
declare global {
  var prisma: PrismaClient | undefined;
}

// Use a single instance of Prisma Client across the app to avoid connection issues
export const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'production' ? ['error'] : ['query', 'info', 'warn', 'error'],
});

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
