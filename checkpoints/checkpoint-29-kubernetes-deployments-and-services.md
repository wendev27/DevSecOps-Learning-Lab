# Checkpoint 30 — Kubernetes Deployments & Services

## 🎯 Objective

Understand how Kubernetes manages application availability using Deployments and ReplicaSets, and learn how Services provide stable networking and access to Pods.

The goal of this checkpoint was to move beyond individual Pods and explore how Kubernetes automatically maintains, scales, and exposes applications.

---

## 📚 Topics Covered

### Deployments

- Deployment Fundamentals
- ReplicaSets
- Self-Healing
- Scaling Deployments

### Services

- Labels
- Selectors
- ClusterIP
- NodePort
- Exposing Deployments

---

## 🤔 Questions Explored

- Why should Deployments be used instead of standalone Pods?
- How does Kubernetes automatically recreate failed Pods?
- What is the relationship between Deployments, ReplicaSets, and Pods?
- Why are Labels and Selectors important?
- How do Services discover Pods?
- Why shouldn't applications communicate directly with Pod IP addresses?
- What problem does ClusterIP solve?
- How does NodePort expose applications outside the cluster?
- How does `kubectl port-forward` work?

---

## 🔬 Labs and Experiments

### Deployment Lab

- Created the first Deployment
- Inspected Deployments
- Inspected ReplicaSets
- Observed automatic Pod creation
- Deleted Pods to observe self-healing
- Scaled Deployment from 1 to 3 replicas

### Service Lab

- Created a ClusterIP Service
- Connected the Service to Pods using Labels and Selectors
- Inspected Service Endpoints
- Converted the Service into a NodePort Service
- Exposed the Deployment using `kubectl port-forward`
- Successfully accessed the Nginx application through the browser

---

## 🧠 Key Concepts

- Deployments define the desired application state.
- ReplicaSets ensure the desired number of Pods are always running.
- Kubernetes continuously reconciles the desired state with the actual cluster state.
- Pods are ephemeral and should never be relied upon by their IP addresses.
- Labels organize Kubernetes resources.
- Selectors allow Services and Deployments to locate Pods dynamically.
- ClusterIP provides stable internal networking.
- NodePort exposes Services outside the cluster.
- Port Forwarding creates a temporary tunnel between the local machine and a Kubernetes Service.

---

## 💭 Reflection

This checkpoint made Kubernetes feel significantly more practical.

Instead of manually managing containers, I experienced Kubernetes automatically creating, replacing, and scaling Pods based on the desired state.

The biggest realization was understanding that applications should never communicate directly with Pods. Services provide stable networking while Pods remain disposable resources that Kubernetes can recreate at any time.

Seeing the Nginx application served through a Kubernetes Service completed the connection between Deployments, ReplicaSets, Pods, and Services.

---

## 🚀 Next Checkpoint

- Pod Networking
- LoadBalancer Services
- ConfigMaps
- Secrets
