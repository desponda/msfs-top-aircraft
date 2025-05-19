#!/bin/bash
# This script ensures the Prisma client is properly generated in the local dev environment

set -e

# Colors for terminal output
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
NC="\033[0m" # No Color

echo -e "${GREEN}Cleaning up old node_modules, .prisma, and dist...${NC}"
cd "$(dirname "$0")/../app"
rm -rf node_modules .prisma dist

# Install dependencies in the app directory
echo -e "${YELLOW}Installing backend dependencies...${NC}"
npm install

echo -e "${YELLOW}Generating Prisma client from schema...${NC}"
npx prisma generate --schema=../prisma/schema.prisma

echo -e "${GREEN}Prisma client successfully generated!${NC}"
echo -e "${YELLOW}You can now run 'make dev-up' to start the development servers.${NC}"
