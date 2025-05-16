#!/bin/sh
# Prisma migration diagnostic script
echo "Running Prisma migration diagnostic script"
echo "================================="

# Check environment
echo "Environment:"
echo "NODE_ENV: $NODE_ENV"
echo "DATABASE_URL: ${DATABASE_URL:0:20}..." # Show only beginning for security
echo "PWD: $(pwd)"

# Check Prisma directories
echo "\nChecking Prisma directories:"
ls -la node_modules/.prisma 2>/dev/null || echo "  node_modules/.prisma not found"
ls -la node_modules/.prisma/client 2>/dev/null || echo "  node_modules/.prisma/client not found"

# Check Prisma schema
echo "\nPrisma schema:"
ls -la schema.prisma || echo "  schema.prisma not found"
cat schema.prisma | grep -A 3 "generator client" || echo "  Could not find generator client in schema.prisma"

# Try to run a minimal Prisma generate
echo "\nTrying Prisma generate:"
npx prisma generate || echo "Failed to generate client"

# Check if client was generated
echo "\nChecking if generate created client files:"
ls -la node_modules/.prisma/client/index.js 2>/dev/null || echo "  Client index.js not found"

# Check compiled TypeScript files
echo "\nChecking compiled TypeScript files:"
ls -la dist/import-initial-data.js 2>/dev/null || echo "  import-initial-data.js not found"

echo "\nDone with diagnostics"
