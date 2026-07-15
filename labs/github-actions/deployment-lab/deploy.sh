#!/bin/bash

echo "Pulling latest image..."

docker pull wendev27/my-first-image:latest

echo "Stopping old container..."

docker stop production-app || true

docker rm production-app || true

echo "Starting new container..."

docker run -d \
  --name production-app \
  -p 8080:3000 \
  wendev27/my-first-image:latest

echo "Deployment complete!"