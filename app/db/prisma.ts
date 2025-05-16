import { PrismaClient } from '@prisma/client';

// Create a singleton Prisma Client instance
declare global {
  var prisma: PrismaClient | undefined;
}

// Retry logic for Prisma client initialization
const getPrismaClient = () => {
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === 'production' ? ['error'] : ['query', 'info', 'warn', 'error'],
    });
  } catch (error) {
    console.error('Failed to initialize Prisma client:', error);
    throw error;
  }
};

// Use a single instance of Prisma Client across the app to avoid connection issues
export const prisma = global.prisma || getPrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
