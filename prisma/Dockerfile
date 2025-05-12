FROM node:22.15.0-slim
WORKDIR /prisma
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
COPY data/ data/
COPY import-initial-data.ts .
ENV NODE_ENV=production
CMD ["npx", "prisma", "migrate", "deploy"]
# To import initial data, run:
# npx ts-node import-initial-data.ts 