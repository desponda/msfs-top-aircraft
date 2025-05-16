FROM node:22.15.0-slim
WORKDIR /app/prisma
COPY prisma/package.json prisma/package-lock.json ./
RUN npm ci
RUN apt-get update && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*
COPY prisma/ ./
COPY prisma/prisma-migrate-diagnostics.sh /app/prisma/

# Ensure directories exist for Prisma client
RUN mkdir -p /app/prisma/node_modules/.prisma/client

# Set environment variables for Prisma
ENV NODE_ENV=production
ENV PRISMA_SCHEMA_ENGINE_BINARY=/app/prisma/node_modules/prisma/libquery_engine-debian-openssl-3.0.x.so
ENV PRISMA_QUERY_ENGINE_BINARY=/app/prisma/node_modules/prisma/libquery_engine-debian-openssl-3.0.x.so
ENV PRISMA_QUERY_ENGINE_LIBRARY=/app/prisma/node_modules/prisma/libquery_engine-debian-openssl-3.0.x.so
ENV PRISMA_SCHEMA_ENGINE_LIBRARY=/app/prisma/node_modules/prisma/libquery_engine-debian-openssl-3.0.x.so
ENV PRISMA_CLIENT_ENGINE_TYPE=binary

# Compile TypeScript and generate Prisma client
RUN npx tsc --project tsconfig.json
RUN npx prisma generate

# Create a startup script to ensure proper execution
RUN echo '#!/bin/sh\nset -e\n\n# Generate Prisma client\necho "Generating Prisma client..."\nnpx prisma generate\n\n# Run migrations\necho "Running migrations..."\nnpx prisma migrate deploy\n\n# Run diagnostics if needed\nif [ -n "$DEBUG_PRISMA" ]; then\n  /app/prisma/prisma-migrate-diagnostics.sh\nfi\n\n# Import data\necho "Importing initial data..."\nnode dist/import-initial-data.js\n' > /app/prisma/start.sh && \
    chmod +x /app/prisma/start.sh

# Set the command to run the startup script
CMD ["/app/prisma/start.sh"]
