#!/bin/bash

# Insight AI - Database Backup Script
# Retention: 30 days

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="./backups"
DB_NAME="insight_ai"
DB_USER="user"
DB_HOST="localhost"

mkdir -p $BACKUP_DIR

echo "🚀 Starting database backup for $DB_NAME..."

# Execute pg_dump
docker exec insight-ai-db pg_dump -U $DB_USER $DB_NAME > $BACKUP_DIR/backup_$TIMESTAMP.sql

if [ $? -eq 0 ]; then
  echo "✅ Backup successful: $BACKUP_DIR/backup_$TIMESTAMP.sql"
  
  # Cleanup old backups (older than 30 days)
  find $BACKUP_DIR -name "backup_*.sql" -mtime +30 -exec rm {} \;
  echo "🧹 Cleaned up old backups."
else
  echo "❌ Backup failed!"
  exit 1
fi
