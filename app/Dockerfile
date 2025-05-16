# Stage 1: Build
FROM node:22.15.0-slim AS builder
WORKDIR /app
COPY app/package*.json ./
COPY app/tsconfig.json ./
RUN npm ci
# Copy prisma schema
COPY prisma /app/prisma
# Copy the rest of the app code and build it
COPY app/. ./
RUN npm run build || npx tsc

# Stage 2: Run
FROM node:22.15.0-slim
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
# Install OpenSSL (required for Prisma)
RUN apt-get update && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*
# Generate Prisma client in the runtime environment to ensure it matches the platform
ENV NODE_ENV=production
RUN npx prisma generate
ENV DATABASE_URL=postgresql://msfs:msfs@localhost:5432/msfs_top_aircraft
EXPOSE 3001
# Add a startup script that ensures the Prisma client is generated before starting the app
COPY --from=builder /app/node_modules/.bin/prisma /usr/local/bin/
CMD ["sh", "-c", "prisma generate && node dist/app.js"] 