// Simple script to verify Prisma client initialization
console.log('Attempting to initialize PrismaClient...');

// Check for the Prisma client files
const fs = require('fs');
const path = require('path');

// Helper to check paths
function checkPath(filepath) {
  try {
    const exists = fs.existsSync(filepath);
    console.log(`Path ${filepath} exists: ${exists}`);
    if (exists) {
      const stats = fs.statSync(filepath);
      console.log(`  Type: ${stats.isDirectory() ? 'Directory' : 'File'}`);
      if (stats.isFile()) {
        console.log(`  Size: ${stats.size} bytes`);
      } else if (stats.isDirectory()) {
        console.log(`  Contents: ${fs.readdirSync(filepath).join(', ')}`);
      }
    }
    return exists;
  } catch (err) {
    console.error(`Error checking path ${filepath}:`, err.message);
    return false;
  }
}

// Check for expected paths
console.log('Checking key Prisma paths:');
const modulePath = path.join(process.cwd(), 'node_modules', '.prisma', 'client');
const prismaSubdirPath = path.join(process.cwd(), 'prisma', 'node_modules', '.prisma', 'client');
const clientIndexPath = path.join(modulePath, 'index.js');

checkPath(modulePath);
checkPath(prismaSubdirPath);
checkPath(clientIndexPath);

try {
  const { PrismaClient } = require('@prisma/client');
  console.log('✅ PrismaClient class loaded successfully');
  
  const prisma = new PrismaClient();
  console.log('✅ PrismaClient instance created successfully');
  
  // Immediately invoke an async function to test the connection
  (async () => {
    try {
      // Try a simple query
      console.log('Testing database connection...');
      const result = await prisma.$queryRaw`SELECT 1 as test`;
      console.log('✅ Database connection successful:', result);
      
      // Disconnect properly
      await prisma.$disconnect();
      console.log('Prisma client disconnected properly');
      process.exit(0);
    } catch (err) {
      console.error('❌ Database connection failed:', err.message);
      
      // Try to provide more useful error information
      if (err.message.includes('connection refused')) {
        console.error('Database connection refused. Check if database is running and DATABASE_URL is correct.');
      } else if (err.message.includes('authentication failed')) {
        console.error('Database authentication failed. Check credentials in DATABASE_URL.');
      } else if (err.message.includes('database') && err.message.includes('does not exist')) {
        console.error('Database does not exist. Make sure it has been created.');
      }
      
      process.exit(1);
    }
  })();
} catch (err) {
  console.error('❌ Failed to initialize PrismaClient:', err.message);
  
  // Provide specific error guidance
  if (err.message.includes('did not initialize yet')) {
    console.error('The Prisma client was not initialized. This typically means prisma generate needs to be run.');
    console.error('Check that the schema.prisma file exists and is valid, and that the prisma generate command was successful.');
  } else if (err.message.includes('Cannot find module')) {
    console.error('The @prisma/client module could not be found. Make sure it is installed correctly.');
    console.error('This usually means either:');
    console.error('1. npm install @prisma/client has not been run, or');
    console.error('2. The Prisma client was not generated properly with npx prisma generate.');
  }
  
  console.error(err);
  process.exit(1);
}