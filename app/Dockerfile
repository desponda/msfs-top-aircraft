# Stage 1: Build
FROM node:22.15.0-slim AS builder
WORKDIR /app
COPY app/package*.json ./
COPY app/tsconfig.json ./
# Copy prisma directory first, so we can generate the client
COPY prisma /prisma
COPY app/. ./
RUN npm ci
# Generate prisma client in the prisma folder as per schema definition
RUN cd /prisma && npx prisma generate
RUN npm run build || npx tsc

# Stage 2: Run
FROM node:22.15.0-slim
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY prisma ./prisma
RUN apt-get update && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*
RUN npx prisma generate
ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://msfs:msfs@localhost:5432/msfs_top_aircraft
EXPOSE 3001
CMD ["node", "dist/app.js"] 