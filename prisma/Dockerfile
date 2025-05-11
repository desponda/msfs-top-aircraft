FROM node:22.15.0-alpine
WORKDIR /prisma
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
ENV NODE_ENV=production
CMD ["npx", "prisma", "migrate", "deploy"] 