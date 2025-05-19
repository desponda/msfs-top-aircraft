# filepath: /workspaces/msfs-top-aircraft/prisma/Dockerfile
FROM node:22.15.0-slim
WORKDIR /app
COPY prisma/package*.json ./prisma/
COPY prisma ./prisma
COPY package*.json ./
RUN npm ci
RUN apt-get update && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*
RUN npx prisma generate --schema=prisma/schema.prisma
ENV DATABASE_URL=postgresql://msfs:msfs@localhost:5432/msfs_top_aircraft
CMD ["npx", "prisma", "migrate", "deploy", "--schema=prisma/schema.prisma"]
