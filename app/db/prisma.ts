import { PrismaClient } from '@prisma/client';

// Create a singleton Prisma Client instance
declare global {
  var prisma: PrismaClient | undefined;
}

// Get Prisma Client with error handling
const getPrismaClient = () => {
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === 'production' ? ['error'] : ['query', 'info', 'warn', 'error'],
    });
  } catch (error) {
    console.error('Failed to initialize Prisma client:', error);
    
    // Check if this is the common "did not initialize yet" error
    if (error instanceof Error && error.message.includes('did not initialize yet')) {
      console.error('Prisma client not initialized. Make sure "prisma generate" was run.');
    }
    
    throw error;
  }
};

// Use a single instance of Prisma Client across the app
export const prisma = global.prisma || getPrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

// Add a graceful shutdown handler
process.on('beforeExit', async () => {
  if (global.prisma) {
    await global.prisma.$disconnect();
  }
});
