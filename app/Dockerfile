# filepath: /workspaces/msfs-top-aircraft/app/Dockerfile
# Stage 1: Build
FROM node:22.15.0-slim AS builder
WORKDIR /build
COPY package*.json ./
COPY tsconfig.json ./
COPY app/ app/
COPY prisma/ prisma/
RUN npm ci
RUN npx prisma generate --schema=prisma/schema.prisma
RUN npm run build:backend

# Stage 2: Run
FROM node:22.15.0-slim
WORKDIR /app
COPY --from=builder /build/package*.json ./
COPY --from=builder /build/app/dist ./dist
COPY --from=builder /build/prisma ./prisma
COPY --from=builder /build/node_modules ./node_modules
COPY app/startup.sh ./startup.sh

RUN npm install --omit=dev && \
    chmod +x ./startup.sh

RUN apt-get update && \
    apt-get install -y openssl libssl-dev netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://msfs:msfs@localhost:5432/msfs_top_aircraft
EXPOSE 3001
CMD ["./startup.sh"]
