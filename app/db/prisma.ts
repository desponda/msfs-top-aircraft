import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

// Create a singleton Prisma Client instance
declare global {
  var prisma: PrismaClient | undefined;
}

// Diagnostic function to help debug Prisma client issues
const checkPrismaClientStatus = () => {
  console.log('Checking Prisma client status...');
  
  // Check if node_modules/.prisma/client exists
  const clientPath = path.join(process.cwd(), 'node_modules', '.prisma', 'client');
  const prismaClientPath = path.join(process.cwd(), 'prisma', 'node_modules', '.prisma', 'client');
  
  console.log(`Main client path exists: ${fs.existsSync(clientPath)}`);
  console.log(`Prisma subdirectory client path exists: ${fs.existsSync(prismaClientPath)}`);
  
  // Try to check for the query engine
  try {
    const schemaEnginePath = process.env.PRISMA_SCHEMA_ENGINE_BINARY || '';
    console.log(`Schema engine path exists: ${fs.existsSync(schemaEnginePath)}`);
  } catch (e) {
    console.log('Could not check schema engine path', e);
  }
};

// Get Prisma Client with error handling
const getPrismaClient = () => {
  try {
    // Run diagnostics to help debug issues
    checkPrismaClientStatus();
    
    return new PrismaClient({
      log: process.env.NODE_ENV === 'production' ? ['error'] : ['query', 'info', 'warn', 'error'],
    });
  } catch (error) {
    console.error('Failed to initialize Prisma client:', error);
    
    // Check if this is the common "did not initialize yet" error
    if (error instanceof Error && error.message.includes('did not initialize yet')) {
      console.error('Prisma client not initialized. Make sure "prisma generate" was run.');
      // Try to provide more diagnostic information
      checkPrismaClientStatus();
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
