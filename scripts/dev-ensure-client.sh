#!/bin/bash
# This script ensures the Prisma client is properly generated in the local dev environment

set -e

# Colors for terminal output
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
NC="\033[0m" # No Color

echo -e "${GREEN}Ensuring Prisma client is properly generated...${NC}"

# Generate Prisma client
cd "$(dirname "$0")/.."
cd prisma
echo -e "${YELLOW}Generating Prisma client from schema...${NC}"
npx prisma generate

# Ensure the client is accessible to the app
echo -e "${GREEN}Prisma client successfully generated!${NC}"
echo -e "${YELLOW}You can now run 'make dev-up' to start the development servers.${NC}"
