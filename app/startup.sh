#!/bin/sh
# Startup script for backend
echo "Starting application..."

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Check for success
if [ $? -ne 0 ]; then
  echo "Failed to generate Prisma client. Attempting to fix dependencies..."
  # Try reinstalling prisma
  npm install prisma @prisma/client --no-save
  npx prisma generate

  # Check again
  if [ $? -ne 0 ]; then
    echo "Still failed to generate Prisma client. Exiting."
    exit 1
  fi
fi

echo "Starting node application..."
# Start the application
node dist/app.js
