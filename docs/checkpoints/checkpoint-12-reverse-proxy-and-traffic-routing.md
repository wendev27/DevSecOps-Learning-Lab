# Checkpoint 12 — Reverse Proxy & Traffic Routing with Nginx

## Objective

Understand how reverse proxies work in modern infrastructure by using Nginx to route incoming requests to multiple Docker containers.

This checkpoint demonstrates how a single public endpoint can forward requests to the correct internal service.

---

# What We Built

We created a small multi-container application composed of:

- Frontend container (Nginx static site)
- Backend container (Node.js API)
- Nginx reverse proxy container
- Docker Compose network

Users interact with only one public port:

http://localhost:8080

Nginx receives the request and decides where to send it.

---

# Architecture

```text
Browser
    │
    │
localhost:8080
    │
    ▼
┌─────────────────────┐
│       NGINX         │
│   Reverse Proxy     │
└─────────┬───────────┘
          │
    ┌─────┴─────┐
    │           │
    ▼           ▼

Frontend      Backend
(Container)   (Container)

"/"           "/api"

Port 80       Port 4000
```

---

# Request Flow

### Frontend Request

```text
GET /
```

Flow:

```text
Browser
    ↓
localhost:8080
    ↓
Nginx
    ↓
frontend container
```

---

### Backend Request

```text
GET /api
```

Flow:

```text
Browser
    ↓
localhost:8080/api
    ↓
Nginx
    ↓
backend container
```

---

# Key Concepts Learned

## Reverse Proxy

A reverse proxy sits between users and backend services.

Responsibilities:

- Receives requests
- Routes traffic
- Hides internal services
- Centralizes access
- Improves scalability

---

## Docker Networking

Docker Compose automatically created an isolated network for all containers.

Containers communicate using service names:

```nginx
proxy_pass http://backend:4000;
```

instead of:

```text
localhost:4000
```

---

## Why Reverse Proxies Matter

Modern applications rarely expose every service directly.

Instead:

```text
Internet
    ↓
Load Balancer
    ↓
Nginx
    ↓
Containers
```

This architecture is used by:

- Netflix
- YouTube
- Spotify
- Amazon
- Vercel
- AWS
- Kubernetes clusters

---

# Commands Used

Start containers:

```bash
docker compose up --build
```

Stop containers:

```bash
docker compose down
```

View running containers:

```bash
docker ps
```

View logs:

```bash
docker logs reverse-proxy-lab-nginx-1

docker logs reverse-proxy-lab-backend-1

docker logs reverse-proxy-lab-frontend-1
```

---

# Nginx Routing Rules

```nginx
location / {
    proxy_pass http://frontend;
}

location /api {
    proxy_pass http://backend:4000;
}
```

---

# Verification

The system successfully:

✅ Built all Docker images

✅ Created the Docker network

✅ Started frontend, backend, and Nginx containers

✅ Routed requests to `/`

✅ Routed requests to `/api`

✅ Verified communication between containers

---

# Important Discoveries

- Users do not talk directly to containers.
- Nginx decides where traffic goes.
- Docker provides networking between containers.
- URL paths determine routing behavior.
- Reverse proxies are foundational to cloud systems.
- Kubernetes Ingress works using similar concepts.

---

# Mental Models

| Component        | Mental Model       |
| ---------------- | ------------------ |
| Docker Container | House              |
| Docker Network   | Neighborhood       |
| Nginx            | Receptionist       |
| Reverse Proxy    | Traffic Controller |
| URL Path         | Destination        |
| Browser          | Visitor            |

---

# Reflection

Before this checkpoint, containers felt isolated.

After this checkpoint, I understood that:

- Containers communicate through Docker networks.
- Nginx routes requests using rules.
- One public endpoint can manage multiple services.
- Reverse proxies are essential in production systems.

This checkpoint bridges Docker fundamentals and future topics such as:

- Load balancing
- Kubernetes Services
- Kubernetes Ingress
- Cloud infrastructure
- Scalable systems
