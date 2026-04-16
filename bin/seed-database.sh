#!/usr/bin/env bash
# Script: Database Seeding
# Purpose: Import SQL backup into PostgreSQL (Local or RDS)

set -e

# Resolve script directory
SCRIPT_DIR="$(cd "$(dirname "$0")" > /dev/null 2>&1 || exit 1; pwd -P)"
PROJECT_ROOT="$(cd $SCRIPT_DIR/.. > /dev/null 2>&1 || exit 1; pwd -P)"
SQL_FILE="$PROJECT_ROOT/luminous_hq_backup_utf8.sql"

if [ ! -f "$SQL_FILE" ]; then
    echo "WARNING: SQL backup file not found at $SQL_FILE. Skipping seeding."
    exit 0
fi

echo "INFO: Checking database for seeding..."

# Use environment variables or defaults
PG_HOST=${POSTGRES_HOST:-localhost}
PG_PORT=${POSTGRES_PORT:-5432}
PG_USER=${POSTGRES_USER:-postgres}
PG_DB=${POSTGRES_NAME:-postgres}
PG_PASS=${POSTGRES_PASS:-postgres123}

# Try to get variables from Terraform if in infra dir
if [ -d "$PROJECT_ROOT/infra/.terraform" ]; then
    cd "$PROJECT_ROOT/infra"
    TF_HOST=$(terraform output -raw rds_endpoint 2>/dev/null || echo "")
    TF_DB=$(terraform output -raw rds_db_name 2>/dev/null || echo "")
    
    if [ -n "$TF_HOST" ] && [[ "$TF_HOST" != *" "* ]]; then
        PG_HOST=$TF_HOST
        # Port is handle by endpoint or default
    fi
    
    if [ -n "$TF_DB" ] && [[ "$TF_DB" != *" "* ]]; then
        PG_DB=$TF_DB
    fi
fi

export PGPASSWORD="$PG_PASS"

# Check if database is already seeded
# We check for the "Team" table which is core to the schema
TABLE_EXISTS=$(psql -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER" -d "$PG_DB" -tAc "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'Team');" 2>/dev/null || echo "f")

if [ "$TABLE_EXISTS" = "t" ]; then
    ROW_COUNT=$(psql -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER" -d "$PG_DB" -tAc "SELECT COUNT(*) FROM \"Team\";" 2>/dev/null || echo "0")
    if [ "$ROW_COUNT" -gt 0 ]; then
        echo "INFO: Database already contains data ($ROW_COUNT teams). Skipping import."
        exit 0
    fi
fi

echo "INFO: Importing $SQL_FILE into $PG_DB on $PG_HOST:$PG_PORT..."

# Note: Using --quiet to avoid excessive output but still show errors
cat "$SQL_FILE" | psql -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER" -d "$PG_DB" --quiet

echo "INFO: Database seeded successfully!"
