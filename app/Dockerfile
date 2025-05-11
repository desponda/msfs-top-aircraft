# Stage 1: Build
FROM node:22.15.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY . ./
RUN npm ci
RUN npm run build || npx tsc

# Stage 2: Run
FROM node:22.15.0-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://msfs:msfs@localhost:5432/msfs_top_aircraft
EXPOSE 3001
CMD ["node", "dist/app.js"] 