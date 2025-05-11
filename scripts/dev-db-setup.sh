#!/bin/bash
set -e

DB_USER="msfs"
DB_PASS="msfs"
DB_NAME="msfs_top_aircraft"

# 1. Install PostgreSQL if not present
if ! command -v psql > /dev/null; then
  echo "Installing PostgreSQL..."
  sudo apt-get update
  sudo apt-get install -y postgresql
fi

# 2. Ensure PostgreSQL is running
sudo service postgresql start

# 3. Create user and database if not exist, and grant CREATEDB privilege
sudo -u postgres psql <<EOF
DO
\$do\$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles WHERE rolname = '$DB_USER'
   ) THEN
      CREATE ROLE $DB_USER LOGIN PASSWORD '$DB_PASS';
   END IF;
END
\$do\$;

ALTER USER $DB_USER WITH PASSWORD '$DB_PASS';
ALTER USER $DB_USER CREATEDB;

DO
\$do\$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_database WHERE datname = '$DB_NAME'
   ) THEN
      CREATE DATABASE $DB_NAME OWNER $DB_USER;
   END IF;
END
\$do\$;
EOF

# 4. Set DATABASE_URL for all following commands
export DATABASE_URL="postgresql://$DB_USER:$DB_PASS@localhost:5432/$DB_NAME"

# 5. Run migrations (if using Prisma)
npx prisma migrate deploy

# 6. Hydrate with dev data
make import-dev-data

echo "Dev database setup and hydrated!" 