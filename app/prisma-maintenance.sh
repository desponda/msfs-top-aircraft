#!/bin/sh
# Enhanced diagnostics for Prisma client troubleshooting
set -e

echo "-----------------------------------------"
echo "PRISMA CLIENT MAINTENANCE UTILITY"
echo "-----------------------------------------"

# Check the database URL is properly configured
if [ -z "$DATABASE_URL" ]; then
  echo "⚠️ WARNING: DATABASE_URL environment variable is not set"
  echo "Using default connection string for local development"
fi

# Check for required directories
echo "Checking for required directories..."
for dir in "/app/node_modules/.prisma" "/app/node_modules/.prisma/client"; do
  if [ ! -d "$dir" ]; then
    echo "Creating missing directory: $dir"
    mkdir -p "$dir"
  fi
done

# Look for existing Prisma client engine
echo "Searching for existing Prisma query engine binary..."
find /app -name "query-engine-*" -type f 2>/dev/null | head -5

# Check for the schema file
if [ ! -f "/app/prisma/schema.prisma" ]; then
  echo "❌ ERROR: Missing schema.prisma file!"
  exit 1
fi

# Run client generation check
echo "Checking for existing client..."
if [ ! -f "/app/node_modules/.prisma/client/index.js" ]; then
  echo "Prisma client not found, needs to be generated"
else
  echo "Existing Prisma client found at /app/node_modules/.prisma/client"
  echo "Last modified: $(ls -la /app/node_modules/.prisma/client/index.js)"
fi

# Check database connectivity
echo "Testing database connection..."
if [ -n "$DATABASE_URL" ]; then
  # Extract host and port from DATABASE_URL for basic connectivity test
  DB_HOST=$(echo $DATABASE_URL | sed -E 's/.*@([^:]+):.*/\1/')
  DB_PORT=$(echo $DATABASE_URL | sed -E 's/.*:([0-9]+)\/.*/\1/')
  
  if [ -n "$DB_HOST" ] && [ -n "$DB_PORT" ]; then
    echo "Checking connectivity to $DB_HOST:$DB_PORT..."
    nc -z -w3 $DB_HOST $DB_PORT 2>/dev/null
    if [ $? -eq 0 ]; then
      echo "✅ Database server is reachable"
    else
      echo "⚠️ Database server is not reachable - might be a network issue"
    fi
  fi
fi

echo "-----------------------------------------"
echo "End of diagnostics report"
echo "-----------------------------------------"
