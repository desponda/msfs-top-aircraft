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
# Install both production dependencies and prisma as a regular dependency
RUN npm install --omit=dev && npm install prisma @prisma/client --no-save
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY app/startup.sh ./startup.sh
# Install OpenSSL (required for Prisma)
RUN apt-get update && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*
# Make sure the startup script is executable
RUN chmod +x ./startup.sh
ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://msfs:msfs@localhost:5432/msfs_top_aircraft
EXPOSE 3001
# Use our startup script that handles prisma generation
CMD ["./startup.sh"] 