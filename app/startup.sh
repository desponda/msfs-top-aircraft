#!/bin/sh
# Minimal startup script for backend

echo "Starting application..."

# Generate Prisma client (should be a no-op if already generated in build)
echo "Generating Prisma client..."
npx prisma generate --schema=/app/prisma/schema.prisma

# Optionally wait for migrations (if needed in your orchestration)
if [ -n "$WAIT_FOR_MIGRATIONS" ]; then
  echo "Waiting for migrations to complete (configured delay)..."
  sleep ${MIGRATION_WAIT_TIME:-5}
fi

# Start the application
exec node dist/app.js
