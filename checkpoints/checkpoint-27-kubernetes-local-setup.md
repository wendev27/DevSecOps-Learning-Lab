# ☁️ Phase 8 — Cloud & Orchestration

---

## 🖥️ Checkpoint 27 — Local Kubernetes Setup

### 🎯 Objective

Set up a local Kubernetes environment for development and experimentation.

### ✅ Topics Covered

- [x] Install kubectl
- [x] Install Kind
- [x] Create your first cluster

---

### 🛠️ Tools Used

#### kubectl

The Kubernetes command-line tool used to interact with clusters.

```bash
kubectl version --client
```

---

#### Kind

Kind (Kubernetes in Docker) allows you to create local Kubernetes clusters using Docker containers.

```bash
kind create cluster --name devops-lab
```

---

### 🔍 Verify the Cluster

Check cluster information:

```bash
kubectl cluster-info
```

Expected output:

```text
Kubernetes control plane is running
CoreDNS is running
```

---

List all system pods:

```bash
kubectl get pods --all-namespaces
```

Example output:

```text
kube-apiserver
etcd
coredns
kube-scheduler
kube-controller-manager
kube-proxy
```

---

### 🧠 Architecture Overview

```text
Laptop (Ubuntu)
        │
        ▼
Docker Engine
        │
        ▼
Kind Cluster Container
        │
        ▼
Kubernetes Control Plane
        │
        ▼
Pods and Applications
```

---

### 🎉 Milestone Achieved

At this point, the local Kubernetes cluster is running successfully.

You can now:

- Deploy Pods
- Scale applications
- Expose services
- Manage configurations
- Explore Kubernetes networking

The next step is learning how Pods work inside the cluster.
