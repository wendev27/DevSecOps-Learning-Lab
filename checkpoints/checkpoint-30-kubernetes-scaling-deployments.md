# Checkpoint 30 — Kubernetes Scaling Deployments

## 🎯 Objective

Learn how Kubernetes automatically maintains the desired number of Pods using Deployments and ReplicaSets. Practice scaling applications horizontally and observe how Kubernetes creates additional Pods to match the desired state.

---

## 📚 Topics Covered

- Deployment scaling
- Horizontal scaling
- ReplicaSets
- Desired state vs Current state
- `kubectl scale`
- Observing Pods with `kubectl get pods -w`
- Deployment status
- ReplicaSet status

---

## 🤔 Questions Explored

- What happens when a Deployment is scaled?
- Who actually creates new Pods?
- What is the relationship between Deployments and ReplicaSets?
- What does `READY`, `DESIRED`, `CURRENT`, and `AVAILABLE` mean?
- Why is Kubernetes called a declarative system?
- Why is horizontal scaling important?

---

## 🔬 Labs and Experiments

- Created a Deployment running an Nginx container.
- Scaled the Deployment from 1 replica to 3 replicas.

```bash
kubectl scale deployment hello-deployment --replicas=3
```

- Observed Kubernetes create new Pods automatically.

```bash
kubectl get pods -w
```

- Verified Deployment status.

```bash
kubectl get deployments
```

- Verified ReplicaSet status.

```bash
kubectl get replicasets
```

- Confirmed that the Deployment, ReplicaSet, and Pods all reflected the desired state of 3 replicas.

---

## 🧠 Key Concepts

- A Deployment manages ReplicaSets.
- A ReplicaSet manages Pods.
- Scaling a Deployment changes the desired number of replicas.
- ReplicaSets compare the desired state with the current state.
- If replicas are missing, ReplicaSets create new Pods.
- Kubernetes continuously reconciles the cluster to match the declared desired state.
- Horizontal scaling increases the number of Pods instead of increasing server resources.

Deployment hierarchy:

```

Deployment
↓
ReplicaSet
↓
Pods
↓
Containers

```

---

## 💭 Reflection

This checkpoint made Kubernetes feel much more powerful than simply running containers. Instead of manually creating additional containers, I only declared the desired number of replicas and Kubernetes handled everything automatically. I also understood that Deployments never create Pods directly—they delegate that responsibility to ReplicaSets, which continuously reconcile the actual cluster state with the desired state.

---

## 🚀 Next Checkpoint

- Kubernetes Services
- Labels and Selectors
- ClusterIP
- NodePort
- LoadBalancer
- Pod Networking
