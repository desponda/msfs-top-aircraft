#!/bin/sh
# Prisma diagnostic script
echo "Running Prisma diagnostic script"
echo "================================="

# Check environment
echo "Environment:"
echo "NODE_ENV: $NODE_ENV"
echo "DATABASE_URL: ${DATABASE_URL:0:20}..." # Show only beginning for security

# Check Prisma directories
echo "\nChecking Prisma directories:"
ls -la /app/node_modules/.prisma 2>/dev/null || echo "  /app/node_modules/.prisma not found"
ls -la /app/node_modules/.prisma/client 2>/dev/null || echo "  /app/node_modules/.prisma/client not found"
ls -la /app/prisma/node_modules/.prisma/client 2>/dev/null || echo "  /app/prisma/node_modules/.prisma/client not found"

# Check Prisma engine binaries
echo "\nChecking Prisma binaries:"
echo "Schema engine binary: $PRISMA_SCHEMA_ENGINE_BINARY"
[ -f "$PRISMA_SCHEMA_ENGINE_BINARY" ] && echo "  Exists: Yes" || echo "  Exists: No"

echo "Query engine binary: $PRISMA_QUERY_ENGINE_BINARY"
[ -f "$PRISMA_QUERY_ENGINE_BINARY" ] && echo "  Exists: Yes" || echo "  Exists: No"

# Try to run a minimal Prisma generate
echo "\nTrying Prisma generate with explicit paths:"
npx prisma generate --schema=/app/prisma/schema.prisma || echo "Failed to generate client"

# Check if client was generated
echo "\nChecking if generate created client files:"
ls -la /app/node_modules/.prisma/client/index.js 2>/dev/null || echo "  Client index.js not found"

echo "\nDone with diagnostics"
