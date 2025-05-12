FROM node:22.15.0-slim
WORKDIR /prisma
COPY prisma/package.json prisma/package-lock.json ./
RUN npm ci --omit=dev
RUN apt-get update && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*
COPY prisma/. ./
ENV NODE_ENV=production
RUN npx tsc --project tsconfig.json
RUN npx prisma generate
CMD ["sh"]
