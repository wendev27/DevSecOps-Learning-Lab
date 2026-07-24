# Checkpoint 28 - Kubernetes Pods

## Objective

Learn how to create, inspect, and delete Pods in a local Kubernetes cluster using Kind.

---

## What I Learned

- A Pod is the smallest deployable unit in Kubernetes.
- A Pod can contain one or more containers.
- Pods run on Kubernetes Nodes.
- Kubernetes schedules Pods onto available Nodes.
- Standalone Pods are not automatically recreated when deleted.
- A Pod is different from a Docker container:
  - Docker runs containers directly.
  - Kubernetes manages Pods, which contain containers.

---

## Project Structure

```text
kubernetes/
└── pod.yaml
```

---

## Create a Pod

Apply the manifest:

```bash
kubectl apply -f pod.yaml
```

Verify it is running:

```bash
kubectl get pods
```

Example:

```text
NAME        READY   STATUS    RESTARTS   AGE
hello-pod   1/1     Running   0          8s
```

---

## Inspect the Pod

View detailed information:

```bash
kubectl describe pod hello-pod
```

View Pod details:

```bash
kubectl get pod hello-pod -o wide
```

Example:

```text
NAME        READY   STATUS    IP           NODE
hello-pod   1/1     Running   10.244.0.2   devops-lab-control-plane
```

---

## Delete the Pod

```bash
kubectl delete pod hello-pod
```

Verify deletion:

```bash
kubectl get pods
```

Example:

```text
No resources found in default namespace.
```

---

## Important Observation

Deleting the Pod does **not** delete the Kind cluster.

After deleting the Pod:

```bash
kubectl get pods
```

returns:

```text
No resources found in default namespace.
```

However:

```bash
docker ps
```

still shows:

```text
devops-lab-control-plane
```

This is because:

- The Kind cluster itself is a Docker container.
- The Pod exists inside the Kubernetes cluster.
- Deleting a Pod only removes that workload.
- The Kubernetes Node (Kind container) continues running.

---

## Architecture

```text
Ubuntu
    │
Docker
    │
Kind Cluster (Docker Container)
    │
Kubernetes Node
    │
Pod
    │
Container (nginx)
```

---

## Key Takeaways

- Pods are the smallest deployable objects in Kubernetes.
- Pods encapsulate one or more containers.
- Pods are scheduled onto Nodes.
- Standalone Pods are ephemeral.
- Deleting a standalone Pod permanently removes it.
- The Kubernetes cluster remains running after Pod deletion.

---

## Next Step

Checkpoint 29 introduces **Deployments**, which automatically recreate Pods and provide self-healing, scaling, and desired state management.
