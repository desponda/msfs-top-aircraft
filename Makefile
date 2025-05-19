# MSFS Top Aircraft - Makefile
#
# This Makefile provides convenient commands for development, building, and deploying
# the MSFS Top Aircraft application which consists of:
#   - Node.js/Express/TypeScript backend (in the app directory)
#   - React/TypeScript/Vite frontend (in the frontend directory)

# Default shell
SHELL := /bin/bash

# Directories
FRONTEND_DIR := frontend

# Colors for terminal output
GREEN := \033[0;32m
YELLOW := \033[0;33m
NC := \033[0m # No Color

.PHONY: help install dev-backend dev-frontend dev-up install-backend install-frontend build clean reset-reports export-dev-data import-dev-data dev-db-setup
.PHONY: help install dev-backend dev-frontend dev-up install-backend install-frontend build clean reset-reports export-dev-data import-dev-data dev-db-setup ensure-client

# Ensure Prisma client is generated correctly
ensure-client:
	@echo -e "$(GREEN)Ensuring Prisma client is correctly generated...$(NC)"
	./scripts/ensure-client.sh
# Help command
help:
	@echo -e "$(GREEN)MSFS Top Aircraft Makefile Commands:$(NC)"
	@echo -e "  $(YELLOW)make install$(NC)         Install dependencies for both backend and frontend"
	@echo -e "  $(YELLOW)make dev-up$(NC)          Start both backend and frontend in development mode"
	@echo -e "  $(YELLOW)make dev-backend$(NC)     Start only the backend in development mode"
	@echo -e "  $(YELLOW)make dev-frontend$(NC)    Start only the frontend in development mode"
	@echo -e "  $(YELLOW)make build$(NC)           Build both backend and frontend for production"
	@echo -e "  $(YELLOW)make clean$(NC)           Remove node_modules and build directories"
	@echo -e "  $(YELLOW)make reset-reports$(NC)   Reset reports data to a clean slate for testing"
	@echo -e "  $(YELLOW)make export-dev-data$(NC)  Export current database state to dev-export JSON"
	@echo -e "  $(YELLOW)make import-dev-data$(NC)  Import dev-export JSON into database"
	@echo -e "  $(YELLOW)make dev-db-setup$(NC)     Set up and hydrate dev database (idempotent)"
	@echo -e "  $(YELLOW)make ensure-client$(NC)    Ensure Prisma client is properly generated"

# Install dependencies for both backend and frontend
install:
	@echo -e "$(GREEN)Installing all dependencies (backend & frontend)...$(NC)"
	npm install
	cd $(FRONTEND_DIR) && npm install

# Start backend in development mode
dev-backend:
	@echo -e "$(GREEN)Starting backend development server on http://localhost:3001$(NC)"
	npm run dev:backend

# Start frontend in development mode
dev-frontend:
	@echo -e "$(GREEN)Starting frontend development server...$(NC)"
	cd $(FRONTEND_DIR) && npm run dev

# Start both backend and frontend in development mode
dev-up:
	@echo -e "$(GREEN)Starting both backend and frontend development servers...$(NC)"
	@echo -e "$(YELLOW)Ensuring Prisma client is generated...$(NC)"
	npm run prisma:generate
	@echo -e "$(YELLOW)Backend will be available at: http://localhost:3001/api/aircraft$(NC)"
	@echo -e "$(YELLOW)Frontend will be available at: http://localhost:5173$(NC)"
	(npm run dev:backend) & \
	(cd $(FRONTEND_DIR) && npm run dev) & \
	wait

# Build for production
build:
	@echo -e "$(GREEN)Building backend for production...$(NC)"
	npm run build:backend
	@echo -e "$(GREEN)Building frontend for production...$(NC)"
	cd $(FRONTEND_DIR) && npm run build

# Clean up
clean:
	@echo -e "$(GREEN)Cleaning up...$(NC)"
	rm -rf node_modules
	rm -rf app/dist
	rm -rf frontend/node_modules
	rm -rf frontend/dist

# Reset reports data (for testing)
reset-reports:
	@echo -e "$(GREEN)Resetting reports data...$(NC)"
	@if [ -f app/data/reports.json ]; then \
		cp app/data/reports.json app/data/reports.json.bak; \
		echo -e "$(YELLOW)Created backup at app/data/reports.json.bak$(NC)"; \
	fi
	@echo "[" > app/data/reports.json
	@echo "    {" >> app/data/reports.json
	@echo "        \"id\": \"2025-05\"," >> app/data/reports.json
	@echo "        \"type\": \"monthly\"," >> app/data/reports.json
	@echo "        \"year\": 2025," >> app/data/reports.json
	@echo "        \"month\": 5," >> app/data/reports.json
	@echo "        \"title\": \"Top Aircraft - May 2025\"," >> app/data/reports.json
	@echo "        \"description\": \"The most popular aircraft for May 2025\"," >> app/data/reports.json
	@echo "        \"createdAt\": \"2025-05-01T00:00:00Z\"," >> app/data/reports.json
	@echo "        \"updatedAt\": \"2025-05-01T00:00:00Z\"," >> app/data/reports.json
	@echo "        \"aircraft\": []" >> app/data/reports.json
	@echo "    }," >> app/data/reports.json
	@echo "    {" >> app/data/reports.json
	@echo "        \"id\": \"2025\"," >> app/data/reports.json
	@echo "        \"type\": \"yearly\"," >> app/data/reports.json
	@echo "        \"year\": 2025," >> app/data/reports.json
	@echo "        \"title\": \"Top Aircraft - 2025 (YTD)\"," >> app/data/reports.json
	@echo "        \"description\": \"The most popular aircraft for 2025 (year-to-date)\"," >> app/data/reports.json
	@echo "        \"createdAt\": \"2025-01-01T00:00:00Z\"," >> app/data/reports.json
	@echo "        \"updatedAt\": \"2025-05-01T00:00:00Z\"," >> app/data/reports.json
	@echo "        \"aircraft\": []" >> app/data/reports.json
	@echo "    }" >> app/data/reports.json
	@echo "]" >> app/data/reports.json
	@echo -e "$(GREEN)Reports reset complete.$(NC)"

# Export current database state to dev-export JSON
export-dev-data:
	@echo -e "$(GREEN)Exporting dev data from database...$(NC)"
	DATABASE_URL=postgresql://msfs:msfs@localhost:5432/msfs_top_aircraft npx tsx scripts/export-dev-data.ts

# Import dev-export JSON into database
import-dev-data:
	@echo -e "$(GREEN)Importing dev data into database...$(NC)"
	DATABASE_URL=postgresql://msfs:msfs@localhost:5432/msfs_top_aircraft npx tsx scripts/import-dev-data.ts

# Set up and hydrate dev database (idempotent)
dev-db-setup:
	./scripts/dev-db-setup.sh
