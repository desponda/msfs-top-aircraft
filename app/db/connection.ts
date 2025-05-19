// Enhanced Prisma Client connection helper with retries and connection pooling
import { PrismaClient } from '@prisma/client';

// Maximum number of connection attempts
const MAX_RETRY_COUNT = 5;
// Delay between retries in ms (starts at 1s, then doubles)
const INITIAL_RETRY_DELAY = 1000;

// Create a singleton Prisma Client instance with connection pooling
declare global {
  var prisma: PrismaClient | undefined;
}

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
