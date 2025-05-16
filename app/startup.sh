#!/bin/sh
# Startu  npx prisma generate --schema=/app/prisma/schema.prisma

  # Check again
  if [ $? -ne 0 ]; then
    echo "Still failed to generate Prisma client. Exiting."
    exit 1
  fi
fi

# Explicitly copy the generated client to the expected location if needed
echo "Ensuring Prisma client is in the correct location..."
if [ -d "/app/prisma/node_modules/.prisma/client" ] && [ ! -d "/app/node_modules/.prisma/client" ]; then
  mkdir -p /app/node_modules/.prisma
  cp -r /app/prisma/node_modules/.prisma/client /app/node_modules/.prisma/
fi

# Wait for database migrations to complete if needed
# Only do this check if we're running in Kubernetes and migration jobs might be running
if [ -n "$KUBERNETES_SERVICE_HOST" ]; then
  echo "Running in Kubernetes - waiting for migrations to be ready..."
  # We use a simple sleep here as a basic approach 
  # For production, you could implement a more sophisticated check
  sleep 10
fiend
echo "Starting application..."

# Copy schema to the correct location relative to where we are generating
echo "Setting up Prisma environment..."
mkdir -p /app/node_modules/.prisma
mkdir -p /app/node_modules/@prisma

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate --schema=/app/prisma/schema.prisma

# Check for success
if [ $? -ne 0 ]; then
  echo "Failed to generate Prisma client. Attempting to fix dependencies..."
  # Try reinstalling prisma
  npm install prisma @prisma/client --no-save
  npx prisma generate --schema=/app/prisma/schema.prisma

  # Check again
  if [ $? -ne 0 ]; then
    echo "Still failed to generate Prisma client. Exiting."
    exit 1
  fi
fi

# Wait for database migrations to complete if needed
# Only do this check if we're running in Kubernetes and migration jobs might be running
if [ -n "$KUBERNETES_SERVICE_HOST" ]; then
  echo "Running in Kubernetes - waiting for migrations to be ready..."
  # We use a simple sleep here as a basic approach 
  # For production, you could implement a more sophisticated check
  sleep 10
fi

echo "Starting node application..."
# Start the application
node dist/app.js
