🐳 Phase 2 — Containerization Cheat Sheet

resources/phase-2-containerization-cheatsheet.md

🐳 Phase 2: Docker
Build image
docker build -t my-app .
List images
docker images
Run container
docker run my-app
Run with ports
docker run -p 8080:3000 my-app

Meaning:

Host:8080 → Container:3000
Running containers
docker ps
Stop container
docker stop <container-id>
Remove container
docker rm <container-id>
Remove image
docker rmi my-app
Dockerfile
FROM node:24

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]
Docker Compose
services:

frontend:
build: ./frontend

backend:
build: ./backend

database:
image: postgres
Container networking
Browser

↓

Host port (8080)

↓

Container port (3000)

↓

Application
Mental model
One app

❌ One giant server

✅ Multiple containers

Frontend
Backend
Database
Redis
Nginx

docker logs <container-id>

docker exec -it <container-id> bash

docker inspect <container-id>

docker network ls

docker network inspect <network-name>

docker compose up --build

docker compose down
