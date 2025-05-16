import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { prisma, getPrismaClient, checkPrismaClientStatus } from './connection';

// Re-export the client and utilities
export { prisma, getPrismaClient, checkPrismaClientStatus };

// Initialize the client immediately on import
(async () => {
  try {
    console.log('Initializing Prisma client...');
    await getPrismaClient();
    console.log('Prisma client initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Prisma client:', error);
    // Don't exit - let the application handle the error
  }
})();
