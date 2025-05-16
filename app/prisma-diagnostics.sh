#!/bin/sh
# Enhanced Prisma diagnostic script
echo "Running Prisma diagnostic script"
echo "================================="

# Check environment
echo "Environment:"
echo "NODE_ENV: $NODE_ENV"
echo "DATABASE_URL present: $(if [ -n "$DATABASE_URL" ]; then echo "Yes"; else echo "No"; fi)"
echo "DATABASE_URL starts with: $(echo $DATABASE_URL | cut -c 1-15)..."

# Check Node.js version
echo "\nNode.js Information:"
node --version
npm --version

# Check Prisma package installation
echo "\nPrisma package installation:"
npm list @prisma/client
npm list prisma

# Check file system permissions
echo "\nFile system permissions:"
ls -la /app/node_modules/.prisma 2>/dev/null || echo "  /app/node_modules/.prisma not found"
ls -la /app/prisma 2>/dev/null || echo "  /app/prisma not found"

# Check Prisma directories
echo "\nChecking Prisma directories:"
ls -la /app/node_modules/.prisma 2>/dev/null || echo "  /app/node_modules/.prisma not found"
ls -la /app/node_modules/.prisma/client 2>/dev/null || echo "  /app/node_modules/.prisma/client not found"
ls -la /app/prisma/node_modules/.prisma/client 2>/dev/null || echo "  /app/prisma/node_modules/.prisma/client not found"

# Check important Prisma files
echo "\nChecking key Prisma files:"
if [ -f "/app/node_modules/.prisma/client/index.js" ]; then
  echo "  /app/node_modules/.prisma/client/index.js exists"
  ls -la /app/node_modules/.prisma/client/index.js
else
  echo "  /app/node_modules/.prisma/client/index.js not found"
fi

if [ -f "/app/prisma/schema.prisma" ]; then
  echo "  /app/prisma/schema.prisma exists"
  ls -la /app/prisma/schema.prisma
  echo "  Schema content (first 10 lines):"
  head -n 10 /app/prisma/schema.prisma
else
  echo "  /app/prisma/schema.prisma not found"
fi

# Check Prisma engine binaries
echo "\nChecking Prisma binaries:"
echo "Schema engine binary: $PRISMA_SCHEMA_ENGINE_BINARY"
[ -f "$PRISMA_SCHEMA_ENGINE_BINARY" ] && echo "  Exists: Yes" || echo "  Exists: No"

echo "Query engine binary: $PRISMA_QUERY_ENGINE_BINARY"
[ -f "$PRISMA_QUERY_ENGINE_BINARY" ] && echo "  Exists: Yes" || echo "  Exists: No"

# Check for the Prisma engines in known locations
echo "\nSearching for Prisma query engine:"
find /app -name "query-engine-*" -type f 2>/dev/null || echo "  No query engine found"

# Connectivity check
echo "\nChecking database connectivity:"
DATABASE_URL="${DATABASE_URL:-postgresql://msfs:msfs@localhost:5432/msfs_top_aircraft}" \
  node -e "
  const url = process.env.DATABASE_URL;
  console.log('Using connection URL starting with: ' + url.substring(0, 15) + '...');
  const parts = new URL(url);
  console.log('Hostname: ' + parts.hostname);
  console.log('Port: ' + parts.port);
  console.log('Username: ' + parts.username);
  console.log('Database: ' + parts.pathname.substring(1));
  " || echo "  Failed to parse DATABASE_URL"

# Try to run a minimal Prisma generate
echo "\nTrying Prisma generate with explicit paths:"
npx prisma generate --schema=/app/prisma/schema.prisma || echo "Failed to generate client"

# Check if client was generated
echo "\nChecking if generate created client files:"
ls -la /app/node_modules/.prisma/client/index.js 2>/dev/null || echo "  Client index.js not found"

echo "\nDone with diagnostics"
