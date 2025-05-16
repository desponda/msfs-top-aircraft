# Database Migrations with ArgoCD

This document explains how database migrations are handled in this project when deploying with ArgoCD.

## Migration Setup

This project uses Prisma for database management. When deploying with ArgoCD, we use a specialized approach to ensure migrations run reliably:

1. Each migration job gets a unique name based on the Helm release revision
2. ArgoCD hooks are used to trigger the migration job before syncing application resources
3. A checksum of the Prisma schema is used to force migration job execution when the schema changes

## Preparing for Deployment

Before deploying a new version with schema changes, run:

```bash
# From project root
./scripts/prepare-helm-release.sh
```

This script copies the latest schema.prisma to the Helm directory, ensuring the checksum will be updated.

## How Migrations Work with ArgoCD

1. When ArgoCD detects changes to your git repository, it starts the sync process
2. The "PreSync" hook runs the migration job before other resources are updated
3. If the migration succeeds, the application deployment continues
4. If the migration fails, ArgoCD will show the sync as failed

## Troubleshooting

If migrations fail:

1. Check the migration job logs in Kubernetes:
   ```
   kubectl logs job/prisma-migrate-<revision>
   ```

2. If you need to run migrations manually:
   ```
   kubectl create job --from=cronjob/prisma-migrate manual-migration
   ```

3. Verify database connectivity from the migration pod:
   ```
   kubectl exec -it <pod-name> -- sh -c "nc -vz <db-host> <db-port>"
   ```

## Important Notes

- Always test migrations locally before deploying
- Consider using feature flags for risky schema changes
- Backup your database before applying significant schema changes
