# filepath: /workspaces/msfs-top-aircraft/prisma/Dockerfile
FROM node:22.15.0-slim
WORKDIR /app/prisma

# Install dependencies
COPY prisma/package.json prisma/package-lock.json ./
RUN npm ci

# Install OpenSSL (required for Prisma)
RUN apt-get update && \
    apt-get install -y openssl libssl-dev && \
    rm -rf /var/lib/apt/lists/*

# Copy the source files
COPY prisma/ ./

# Create necessary directories for Prisma client
RUN mkdir -p /app/prisma/node_modules/.prisma/client && \
    mkdir -p /app/node_modules/.prisma/client

# Pre-generate the Prisma client during build
RUN npx prisma generate

# Compile TypeScript
RUN npx tsc --project tsconfig.json

# Create a startup script
RUN echo '#!/bin/sh\n\
echo "Starting migration process..."\n\
# Regenerate Prisma client to ensure it matches the environment\n\
npx prisma generate\n\
\n\
# Run the migrations\n\
echo "Running database migrations..."\n\
npx prisma migrate deploy\n\
\n\
# Run the initial data import\n\
echo "Importing initial data..."\n\
node dist/import-initial-data.js\n\
' > /app/prisma/start.sh && chmod +x /app/prisma/start.sh

# Start with our startup script
CMD ["/app/prisma/start.sh"]
