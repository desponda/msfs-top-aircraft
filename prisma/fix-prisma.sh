#!/bin/sh
# Fix Prisma setup in the container
echo "Running Prisma setup fix script"
echo "================================="

# Make sure node_modules directories exist
mkdir -p /app/prisma/node_modules/.prisma/client

# Install prisma dependencies
echo "Installing prisma dependencies..."
npm install prisma@5.0.0 @prisma/client@5.0.0 --no-save

# Try generating without environment variables
echo "Generating Prisma client without env vars..."
unset PRISMA_QUERY_ENGINE_BINARY
unset PRISMA_SCHEMA_ENGINE_BINARY
unset PRISMA_QUERY_ENGINE_LIBRARY
unset PRISMA_SCHEMA_ENGINE_LIBRARY
unset PRISMA_CLIENT_ENGINE_TYPE

# Generate the client
npx prisma generate

echo "Prisma setup complete"
