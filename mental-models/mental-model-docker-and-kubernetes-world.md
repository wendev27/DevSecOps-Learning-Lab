## ☁️ Docker World vs Kubernetes World

As I move into Kubernetes, I realized that many concepts from Docker and Docker Compose already have direct equivalents in Kubernetes.

| Docker World           | Kubernetes World           | Purpose                                            |
| :--------------------- | :------------------------- | :------------------------------------------------- |
| Container              | Pod                        | Runs one or more containers                        |
| Docker Compose service | Deployment                 | Manages application replicas                       |
| Port mapping           | Service                    | Exposes applications inside or outside the cluster |
| Environment variables  | ConfigMap / Secret         | Stores configuration and sensitive data            |
| Health check           | Liveness / Readiness Probe | Monitors container health                          |
| Docker network         | Cluster network            | Enables communication between services             |
| Volume                 | Persistent Volume          | Persists data beyond container lifetimes           |
| `docker build`         | Image build pipeline       | Creates deployable container images                |
| `docker compose up`    | `kubectl apply`            | Deploys resources into the cluster                 |
| `docker ps`            | `kubectl get pods`         | Lists running workloads                            |
| `docker logs`          | `kubectl logs`             | Displays application logs                          |

---

## 🧠 Mental Model

```text
Docker Compose

┌─────────────────┐
│ Frontend        │
├─────────────────┤
│ Backend         │
├─────────────────┤
│ Database        │
└─────────────────┘

        ↓

Kubernetes

┌─────────────────┐
│ Deployment      │
│ └── Pod         │
├─────────────────┤
│ Deployment      │
│ └── Pod         │
├─────────────────┤
│ StatefulSet     │
│ └── Pod         │
└─────────────────┘
```

---

## 🚀 Key Idea

Kubernetes is not a completely new world.

It expands the concepts already learned from Docker:

- Containers become Pods.
- Compose services become Deployments.
- Port mappings become Services.
- Environment variables become ConfigMaps and Secrets.
- Health checks become probes.
- Docker networks become cluster networking.

The goal of Kubernetes is not simply to run containers—it is to run them reliably, at scale, and across multiple machines.
