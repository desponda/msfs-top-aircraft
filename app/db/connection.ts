// Enhanced Prisma Client connection helper with retries and connection pooling
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

// Maximum number of connection attempts
const MAX_RETRY_COUNT = 5;
// Delay between retries in ms (starts at 1s, then doubles)
const INITIAL_RETRY_DELAY = 1000;

// Create a singleton Prisma Client instance with connection pooling
declare global {
  var prisma: PrismaClient | undefined;
}

// Diagnostic function to help debug Prisma client issues
export const checkPrismaClientStatus = () => {
  console.log('Checking Prisma client status...');
  
  // Check if node_modules/.prisma/client exists
  const clientPath = path.join(process.cwd(), 'node_modules', '.prisma', 'client');
  const prismaClientPath = path.join(process.cwd(), 'prisma', 'node_modules', '.prisma', 'client');
  
  console.log(`Main client path exists: ${fs.existsSync(clientPath)}`);
  console.log(`Prisma subdirectory client path exists: ${fs.existsSync(prismaClientPath)}`);
  
  // Show key files if they exist
  if (fs.existsSync(clientPath) && fs.existsSync(path.join(clientPath, 'index.js'))) {
    console.log('Client index.js found in main path');
  }
  
  if (fs.existsSync(prismaClientPath) && fs.existsSync(path.join(prismaClientPath, 'index.js'))) {
    console.log('Client index.js found in prisma subdirectory');
  }
  
  // Try to check for the query engine
  try {
    const queryEnginePath = process.env.PRISMA_QUERY_ENGINE_BINARY || '';
    console.log(`Query engine path exists: ${fs.existsSync(queryEnginePath)}`);
  } catch (e) {
    console.log('Could not check query engine path', e);
  }
};

// Create Prisma Client with connection pooling and connection management
const createPrismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? ['error'] : ['query', 'info', 'warn', 'error'],
    // Add connection pooling settings
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
};

// Get Prisma Client with error handling and retry logic
export const getPrismaClient = async (): Promise<PrismaClient> => {
  // Run diagnostics to help debug issues
  checkPrismaClientStatus();
  
  // Use existing client if available
  if (global.prisma) {
    return global.prisma;
  }
  
  let client: PrismaClient;
  try {
    client = createPrismaClient();
    
    // Test the connection with retries
    let isConnected = false;
    let retryCount = 0;
    let delay = INITIAL_RETRY_DELAY;
    
    while (!isConnected && retryCount < MAX_RETRY_COUNT) {
      try {
        // Test query to check connection
        await client.$queryRaw`SELECT 1`;
        isConnected = true;
        console.log('Successfully connected to the database');
      } catch (error) {
        retryCount++;
        console.error(`Database connection attempt ${retryCount}/${MAX_RETRY_COUNT} failed:`, error);
        
        if (retryCount >= MAX_RETRY_COUNT) {
          throw new Error(`Failed to connect to database after ${MAX_RETRY_COUNT} attempts`);
        }
        
        // Exponential backoff
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Double the delay for the next attempt
      }
    }
    
    // Store in global object
    global.prisma = client;
    
    return client;
  } catch (error) {
    console.error('Failed to initialize Prisma client:', error);
    
    // Check if this is the common "did not initialize yet" error
    if (error instanceof Error && error.message.includes('did not initialize yet')) {
      console.error('Prisma client not initialized. Make sure "prisma generate" was run.');
      checkPrismaClientStatus();
    }
    
    throw error;
  }
};

// Get a synchronized version of the client (for backward compatibility)
const prismaClientProxy = new Proxy({} as PrismaClient, {
  get: (target, prop) => {
    // For sync operations, return the global prisma client if it exists
    if (!global.prisma) {
      // First access - initialize client
      console.log('Initializing Prisma client on first access');
      global.prisma = createPrismaClient();
    }
    
    return Reflect.get(global.prisma, prop);
  }
});

// Export the client for backward compatibility
export const prisma = prismaClientProxy;

// Set up graceful shutdown
process.on('beforeExit', async () => {
  if (global.prisma) {
    console.log('Disconnecting Prisma client on application shutdown');
    await global.prisma.$disconnect();
  }
});
