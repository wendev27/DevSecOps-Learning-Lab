# ☁️ Phase 8 — Cloud & Orchestration

---

## 📚 Checkpoint 26 — Kubernetes Fundamentals

### 🎯 Objective

Understand why Kubernetes exists and learn the core building blocks of container orchestration.

### ✅ Topics Covered

- [x] What problem Kubernetes solves
- [x] Cluster, Node, Pod, Container

### 🧠 Key Concepts

#### Why Kubernetes?

Docker makes it easy to run containers, but managing many containers across multiple servers becomes difficult.

Kubernetes solves problems such as:

- Automatic scaling
- Self-healing containers
- Load balancing
- Service discovery
- Rolling updates
- High availability

---

#### Core Components

| Component | Description                                |
| --------- | ------------------------------------------ |
| Cluster   | The entire Kubernetes environment          |
| Node      | A machine that runs workloads              |
| Pod       | The smallest deployable unit in Kubernetes |
| Container | The application running inside a Pod       |

---

### 🔄 Docker vs Kubernetes

| Docker                 | Kubernetes        |
| ---------------------- | ----------------- |
| Container              | Pod               |
| Docker Compose Service | Deployment        |
| Docker Network         | Service           |
| Docker Volume          | Persistent Volume |
