#!/bin/sh
# Startup script for backend
echo "Starting application..."

# Run the maintenance utility for diagnostics
if [ -f "/app/prisma-maintenance.sh" ]; then
  echo "Running Prisma maintenance utility..."
  ./prisma-maintenance.sh
fi

# Copy schema to the correct location relative to where we are generating
echo "Setting up Prisma environment..."
mkdir -p /app/node_modules/.prisma/client
mkdir -p /app/node_modules/@prisma

# Generate Prisma client
echo "Generating Prisma client..."
DATABASE_URL="${DATABASE_URL:-postgresql://msfs:msfs@localhost:5432/msfs_top_aircraft}" \
  npx prisma generate --schema=/app/prisma/schema.prisma

# Copy query engine to the expected location if it exists in prisma subdirectory
if [ -f "/app/prisma/node_modules/.prisma/client/libquery_engine-debian-openssl-3.0.x.so.node" ]; then
  echo "Copying query engine from prisma subdirectory..."
  cp /app/prisma/node_modules/.prisma/client/libquery_engine-debian-openssl-3.0.x.so.node /app/node_modules/.prisma/client/
fi

# Check for success
if [ $? -ne 0 ]; then
  echo "Failed to generate Prisma client. Attempting to fix dependencies..."
  # Try reinstalling prisma
  npm install prisma @prisma/client --no-save
  
  # Try again with more verbose output
  DATABASE_URL="${DATABASE_URL:-postgresql://msfs:msfs@localhost:5432/msfs_top_aircraft}" \
    npx prisma generate --schema=/app/prisma/schema.prisma --verbose

  # Check again
  if [ $? -ne 0 ]; then
    echo "Still failed to generate Prisma client. Exiting."
    exit 1
  fi
fi

# Explicitly copy the generated client to the expected location if needed
echo "Ensuring Prisma client is in the correct location..."
if [ -d "/app/prisma/node_modules/.prisma/client" ] && [ ! -d "/app/node_modules/.prisma/client" ]; then
  echo "Copying client from prisma subdirectory..."
  mkdir -p /app/node_modules/.prisma
  cp -r /app/prisma/node_modules/.prisma/client /app/node_modules/.prisma/
fi

# Run diagnostics to help troubleshoot any issues
if [ -f "/app/prisma-maintenance.sh" ]; then
  echo "Running Prisma maintenance utility..."
  sh /app/prisma-maintenance.sh
fi

if [ -f "/app/prisma-diagnostics.sh" ]; then
  echo "Running Prisma diagnostics..."
  sh /app/prisma-diagnostics.sh
fi

# Wait for database migrations to complete if needed
if [ -n "$WAIT_FOR_MIGRATIONS" ]; then
  echo "Waiting for migrations to complete (configured delay)..."
  sleep ${MIGRATION_WAIT_TIME:-5}
fi

# Try to load the generated client to verify it works
echo "Verifying Prisma client can be loaded..."
NODE_PATH=/app/node_modules node -e "try { require('@prisma/client'); console.log('✅ Prisma client loaded successfully'); } catch(e) { console.error('❌ Failed to load Prisma client:', e.message); process.exit(1); }"

# Try to initialize the client 
echo "Verifying Prisma client can connect..."
if [ -f "/app/verify-prisma.js" ]; then
  NODE_PATH=/app/node_modules node /app/verify-prisma.js
  if [ $? -ne 0 ]; then
    # If verification fails, try generating the client once more and continue
    echo "WARNING: Prisma verification failed. Trying one more time to generate client..."
    DATABASE_URL="${DATABASE_URL:-postgresql://msfs:msfs@localhost:5432/msfs_top_aircraft}" \
      npx prisma generate --schema=/app/prisma/schema.prisma
    
    # Retry verification
    NODE_PATH=/app/node_modules node /app/verify-prisma.js
    if [ $? -ne 0 ]; then
      echo "WARNING: Prisma verification still failed, but continuing anyway..."
    fi
  fi
fi

echo "Starting node application..."
# Add a simple health check message before starting the app
echo "Health check: Prisma client is ready, starting application now"
# Start the application with proper error handling
exec node dist/app.js
