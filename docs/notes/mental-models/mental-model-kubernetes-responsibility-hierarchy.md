# Kubernetes Responsibility Hierarchy

Think of Kubernetes as a chain of responsibility. Every layer has exactly one job.

```
You
│
▼
Deployment
"I want 3 Pods."
│
▼
ReplicaSet
"I will always keep 3 Pods running."
│
▼
Pods
"I contain one or more containers."
│
▼
Container Runtime (containerd)
"I start and stop containers."
│
▼
Containers
"The actual application."
```

## Responsibilities

- **Deployment** → Declares the desired state and manages updates.
- **ReplicaSet** → Ensures the desired number of Pods are running.
- **Pod** → Groups one or more containers that should run together.
- **Container Runtime** → Starts and stops containers on the node.
- **Container** → Runs the application code.

## Self-Healing

If a Pod dies:

```
Desired Pods = 3
Current Pods = 2

↓

ReplicaSet creates a new Pod

↓

The Pod requests its containers

↓

The container runtime starts them

↓

Current Pods = 3
```

The ReplicaSet restores the desired state automatically.

## Scaling

When you scale a Deployment:

```
Replicas: 3

↓

Replicas: 10
```

The ReplicaSet creates 7 additional Pods, and each Pod starts its required containers through the container runtime.

Kubernetes doesn't directly create containers—it creates Pods. The container runtime is responsible for launching the containers inside those Pods.
