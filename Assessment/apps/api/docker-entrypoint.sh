#!/bin/sh
set -e

echo "[api] Applying database migrations..."
yarn db:deploy

echo "[api] Seeding database..."
yarn db:seed

echo "[api] Starting API server..."
exec yarn start
