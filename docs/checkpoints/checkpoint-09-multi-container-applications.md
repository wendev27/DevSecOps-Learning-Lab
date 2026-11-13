# Checkpoint 09 — Multi-Container Applications

## Objective

Understand how multiple containers can work together as a single application using Docker Compose.

This checkpoint combines everything learned so far:

- Images
- Containers
- Dockerfiles
- Ports
- Networks
- Docker Compose

Instead of running a single container, we built a small application composed of multiple services.

---

# Why this checkpoint matters

Before this lab, Docker concepts existed separately:

```text
Image

↓

Container

↓

Volume

↓

Network

↓

Port
```

After this lab, we combined them into:

```text
Browser

↓

Frontend

↓

Backend

↓

Docker Network
```

This checkpoint represents the transition from:

```text
Containerization

↓

Multi-Service Applications

↓

CI/CD

↓

Kubernetes

↓

Cloud Infrastructure
```

---

# Main Question

We asked:

> How do real applications run multiple services together?

Until now, we manually created:

- Networks
- Containers
- Images
- Volumes

The goal of this checkpoint was to understand how Docker Compose orchestrates all of them.

---

# Project Structure

We created:

```text
multi-container-lab/

├── compose.yaml
└── backend/
    ├── Dockerfile
    └── app.js
```

---

# Step 1 — Create the Backend Application

File:

```text
backend/app.js
```

Code:

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello from the backend! 🚀');
});

server.listen(4000, () => {
  console.log('Backend running on port 4000');
});
```

---

# Step 2 — Create the Backend Dockerfile

File:

```text
backend/Dockerfile
```

Code:

```dockerfile
FROM node:24

WORKDIR /app

COPY app.js .

EXPOSE 4000

CMD ["node", "app.js"]
```

---

# Dockerfile Review

## FROM node:24

Use the official Node.js image as the foundation.

```text
Linux Layer

↓

Node.js Layer

↓

Our Application
```

---

## WORKDIR /app

Set:

```text
/app
```

as the working directory inside the container.

Equivalent to:

```bash
cd /app
```

---

## COPY app.js .

Copy:

```text
app.js
```

from the local machine into:

```text
/app
```

inside the image.

---

## EXPOSE 4000

Declare that the application listens on:

```text
4000
```

inside the container.

Important:

`EXPOSE` does not publish the port.

It only documents which port the application uses.

---

## CMD ["node", "app.js"]

Run:

```bash
node app.js
```

when the container starts.

---

# Step 3 — Create Docker Compose

File:

```text
compose.yaml
```

Code:

```yaml
services:
  frontend:
    image: nginx
    ports:
      - '3000:80'

  backend:
    build: ./backend
    ports:
      - '4000:4000'
```

---

# New Concept — build

We learned:

```yaml
build: ./backend
```

means:

> Go into the `backend` directory, find the Dockerfile, and build an image.

Compose internally performs something similar to:

```bash
docker build -t multi-container-lab-backend ./backend
```

---

# Step 4 — Build and Start Everything

Command:

```bash
docker compose up --build
```

Docker automatically:

- Builds the backend image
- Creates containers
- Creates a network
- Configures DNS
- Configures ports
- Starts all services

Output:

```text
✔ Image multi-container-lab-backend Built

✔ Network multi-container-lab_default Created

✔ Container multi-container-lab-frontend-1 Created

✔ Container multi-container-lab-backend-1 Created
```

---

# Automatic Network Creation

Docker Compose automatically created:

```text
multi-container-lab_default
```

without manually running:

```bash
docker network create
```

Compose manages the network for us.

---

# Automatic Container Names

Docker Compose generated:

```text
multi-container-lab-frontend-1

multi-container-lab-backend-1
```

Pattern:

```text
project-name

↓

service-name

↓

instance-number
```

---

# Port Mapping Review

Frontend:

```text
3000 → 80
```

Backend:

```text
4000 → 4000
```

General rule:

```text
host-port : container-port
```

Example:

```bash
docker run -p 8080:3000 my-image
```

means:

```text
localhost:8080

↓

Container Port 3000
```

---

# Biggest Discovery

We realized:

The outside port is flexible.

Examples:

```bash
docker run -p 8080:3000 my-image

docker run -p 9999:3000 my-image

docker run -p 5000:3000 my-image
```

All of them still connect to:

```text
Container → Port 3000
```

Docker performs the translation.

---

# Running in Background

Command:

```bash
docker compose up -d --build
```

The `-d` flag means:

```text
Detached mode
```

Compose:

- Starts services
- Runs them in the background
- Returns terminal control

---

# Graceful Shutdown

When pressing:

```text
Ctrl + C
```

Docker does not immediately kill containers.

Instead, it sends:

```text
SIGQUIT
```

Applications receive time to:

- Finish requests
- Save state
- Shut down safely

This is critical in production systems.

---

# Mental Models Built

| Docker Concept              | Mental Model    |
| --------------------------- | --------------- |
| Dockerfile                  | Recipe          |
| Image                       | Blueprint       |
| Container                   | Running machine |
| Volume                      | Warehouse       |
| Network                     | Neighborhood    |
| Port                        | Door            |
| Compose                     | City blueprint  |
| Multi-container application | City            |

---

# Commands Learned

Create lab:

```bash
mkdir ~/multi-container-lab

cd ~/multi-container-lab
```

Create files:

```bash
mkdir backend

touch backend/app.js

touch backend/Dockerfile

touch compose.yaml
```

Build and start:

```bash
docker compose up --build
```

Run in background:

```bash
docker compose up -d --build
```

Show running containers:

```bash
docker ps
```

Show Compose services:

```bash
docker compose ps
```

Stop everything:

```bash
docker compose down
```

---

# Biggest Lesson

Docker Compose is not magic.

It simply automates:

- Building images
- Creating containers
- Creating networks
- Configuring ports
- Managing DNS
- Orchestrating services

using code.

---

# Questions Asked During the Lab

- How do multiple containers work together?
- What does `build: ./backend` mean?
- Why are container names generated automatically?
- Why can the host port change while the container port remains the same?
- Why does `Ctrl + C` gracefully stop containers?
- Why do real applications use multiple services?

---

# Connection to Future Topics

This checkpoint is the bridge toward:

```text
Docker

↓

Microservices

↓

CI/CD

↓

GitHub Actions

↓

Kubernetes

↓

Cloud Infrastructure
```

The next step is automating builds, tests, and deployments.
