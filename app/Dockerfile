# filepath: /workspaces/msfs-top-aircraft/app/Dockerfile
# Stage 1: Build
FROM node:22.15.0-slim AS builder
WORKDIR /app
COPY app/package*.json ./
COPY app/tsconfig.json ./
RUN npm ci
# Copy prisma schema
COPY prisma /app/prisma
# Generate Prisma client during build phase
RUN npx prisma generate --schema=/app/prisma/schema.prisma
# Copy the rest of the app code and build it
COPY app/. ./
RUN npm run build || npx tsc

# Stage 2: Run
FROM node:22.15.0-slim
WORKDIR /app

# Copy application files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY app/startup.sh ./startup.sh
COPY app/prisma-diagnostics.sh ./prisma-diagnostics.sh
COPY app/prisma-maintenance.sh ./prisma-maintenance.sh
COPY app/verify-prisma.js ./verify-prisma.js

# Install production dependencies and ensure directories exist
RUN npm install --omit=dev && \
    chmod +x ./startup.sh && \
    chmod +x ./prisma-diagnostics.sh && \
    chmod +x ./prisma-maintenance.sh

# Install OpenSSL (required for Prisma) and diagnostic tools
RUN apt-get update && \
    apt-get install -y openssl libssl-dev netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://msfs:msfs@localhost:5432/msfs_top_aircraft
EXPOSE 3001
# Use our startup script that handles prisma generation
CMD ["./startup.sh"]
