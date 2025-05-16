#!/bin/bash
# Copy schema.prisma to the helm directory for release
echo "Copying schema.prisma to helm directory..."
cp "$(dirname "$0")/../prisma/schema.prisma" "$(dirname "$0")/../helm/schema.prisma"
echo "Schema copied. You can now proceed with helm install/upgrade or pushing to your ArgoCD repository."
