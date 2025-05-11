#!/bin/bash
set -e

# 1. Install PostgreSQL if not present
if ! command -v psql > /dev/null; then
  echo "Installing PostgreSQL..."
  sudo apt-get update
  sudo apt-get install -y postgresql
fi

# 2. Ensure PostgreSQL is running
sudo service postgresql start

# 3. Create user and database if not exist
sudo -u postgres psql <<EOF
DO
\$do\$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles WHERE rolname = 'msfs'
   ) THEN
      CREATE ROLE msfs LOGIN PASSWORD 'msfs';
   END IF;
END
\$do\$;

DO
\$do\$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_database WHERE datname = 'msfs_top_aircraft'
   ) THEN
      CREATE DATABASE msfs_top_aircraft OWNER msfs;
   END IF;
END
\$do\$;
EOF

# 4. Set password for msfs user (idempotent)
sudo -u postgres psql -c "ALTER USER msfs WITH PASSWORD 'msfs';"

# 5. Set DATABASE_URL for all following commands
export DATABASE_URL="postgresql://msfs:msfs@localhost:5432/msfs_top_aircraft"

# 6. Run migrations (if using Prisma)
npx prisma migrate deploy

# 7. Hydrate with dev data
make import-dev-data

echo "Dev database setup and hydrated!" 