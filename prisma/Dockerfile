FROM node:22.15.0-slim
WORKDIR /prisma
COPY prisma/package.json prisma/package-lock.json ./
RUN npm ci --omit=dev
COPY prisma/. ./
ENV NODE_ENV=production
