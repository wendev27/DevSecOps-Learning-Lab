# Kubernetes Notes — Intern Task App

## 1. Overview

This document records the Kubernetes concepts, implementation decisions, architecture, and testing procedures used to deploy the `intern-task-app`.

The objective is to understand how Kubernetes manages an application running inside a container.

### What we implemented

- Docker image containing the Python application.
- Kubernetes Deployment to manage application Pods.
- Kubernetes Service to provide stable internal networking.
- Readiness and liveness probes for application health monitoring.
- CPU and memory requests and limits.
- Local Kubernetes testing using kind.

---

## 2. Kubernetes Architecture

Our application follows this request flow:

```text
Developer Machine
       |
       v
localhost:8080
       |
       v
kubectl port-forward
       |
       v
Kubernetes Service :80
       |
       v
Kubernetes Pod :5000
       |
       v
Python Application
       |
       v
HTTP Response
```

### Component responsibilities

| Component       | Responsibility                                           |
| --------------- | -------------------------------------------------------- |
| Docker          | Packages the application and its runtime into an image.  |
| Kubernetes Pod  | Runs the application container.                          |
| Deployment      | Maintains the desired number and configuration of Pods.  |
| Service         | Provides a stable network endpoint for accessing Pods.   |
| Readiness Probe | Determines whether a Pod can receive traffic.            |
| Liveness Probe  | Determines whether a container should be restarted.      |
| kind            | Runs a local Kubernetes cluster using Docker containers. |

---

## 3. Deployment — deployment.yaml

### Purpose

A Deployment manages the desired state of an application.

Our configuration requests one application replica.

```yaml
replicas: 1
```

Kubernetes continuously compares the desired state with the actual state.

If the Pod disappears, the Deployment's controller works through its ReplicaSet to create a replacement.

### Important configuration

| Field                  | Explanation                                 |
| ---------------------- | ------------------------------------------- |
| `apiVersion: apps/v1`  | Kubernetes API version for Deployments.     |
| `kind: Deployment`     | Declares this resource as a Deployment.     |
| `metadata.name`        | Name of the Deployment.                     |
| `replicas`             | Desired number of Pods.                     |
| `selector.matchLabels` | Identifies Pods managed by the Deployment.  |
| `template`             | Defines how new Pods are created.           |
| `containers.image`     | Docker image used by the container.         |
| `containerPort`        | Documents the application's container port. |

### Image configuration

```yaml
image: intern-task-app:local
imagePullPolicy: IfNotPresent
```

We use a locally built Docker image loaded into the kind node.

`IfNotPresent` tells Kubernetes to use the image already available locally instead of always attempting to pull it.

This is useful for local development and testing.

### Health checks

#### Readiness Probe

```yaml
readinessProbe:
  httpGet:
    path: /healthz
    port: http
```

Purpose:

Determines whether the application is ready to receive network traffic.

If the readiness probe fails, Kubernetes marks the Pod as not ready and removes it from the Service's eligible endpoints.

It does not automatically restart the container.

#### Liveness Probe

```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: http
```

Purpose:

Determines whether the application is still healthy enough to continue running.

If the liveness probe repeatedly fails, Kubernetes restarts the container.

**Important distinction:**

- Readiness failure: stop sending traffic to the Pod.
- Liveness failure: restart the container.

### Resource management

```yaml
resources:
  requests:
    cpu: 50m
    memory: 64Mi
  limits:
    cpu: 250m
    memory: 128Mi
```

Requests represent the resources Kubernetes uses when scheduling the container.

Limits establish resource boundaries.

- `50m` CPU = 0.05 CPU cores.
- `250m` CPU = 0.25 CPU cores.
- `64Mi` memory = requested memory.
- `128Mi` memory = maximum memory limit.

These are initial values for a lightweight application, not production capacity guarantees.

---

## 4. Service — service.yaml

### Purpose

A Kubernetes Pod has an IP address, but that address can change when a Pod is recreated.

A Service provides a stable network endpoint for accessing matching Pods.

### Label selection

Our Service uses:

```yaml
selector:
  app: intern-task-app
```

Our Deployment creates Pods with the matching label:

```yaml
template:
  metadata:
    labels:
      app: intern-task-app
```

This relationship allows the Service to discover the application's Pods.

### Port configuration

```yaml
ports:
  - name: http
    protocol: TCP
    port: 80
    targetPort: http
```

| Configuration      | Meaning                                             |
| ------------------ | --------------------------------------------------- |
| `port: 80`         | Port exposed by the Service.                        |
| `targetPort: http` | Destination container port identified by its name.  |
| `http`             | References the named container port, which is 5000. |

The request path is:

```text
Service Port 80
      |
      v
Pod Container Port 5000
```

### Service type: ClusterIP

```yaml
type: ClusterIP
```

ClusterIP exposes the Service internally within the Kubernetes cluster.

It does not directly expose the application to the public internet.

For local testing, we use `kubectl port-forward`.

---

## 5. Testing and Verification

We use kind to run a local Kubernetes cluster.

### Step 1 — Build the Docker image

```bash
docker build -t intern-task-app:local .
```

This creates the local application image.

### Step 2 — Create the kind cluster

```bash
kind create cluster --name intern-task
```

### Step 3 — Load the image into kind

```bash
kind load docker-image intern-task-app:local --name intern-task
```

This makes the locally built image available to the Kubernetes node.

### Step 4 — Deploy the Kubernetes resources

```bash
kubectl apply -f k8s/
```

This creates the Deployment and Service.

### Step 5 — Verify the Deployment

```bash
kubectl get deployments
```

Expected state:

```text
READY: 1/1
UP-TO-DATE: 1
AVAILABLE: 1
```

### Step 6 — Verify the Pod

```bash
kubectl get pods -o wide
```

Expected state:

```text
STATUS: Running
READY: 1/1
RESTARTS: 0
```

### Step 7 — Verify the Service

```bash
kubectl get services
```

Expected configuration:

```text
NAME             TYPE        PORT(S)
intern-task-app  ClusterIP   80/TCP
```

### Step 8 — Inspect Pod configuration and events

```bash
kubectl describe pod -l app=intern-task-app
```

Check:

- Container image.
- Container port.
- Readiness probe.
- Liveness probe.
- Resource requests and limits.
- Container state.
- Kubernetes events.

### Step 9 — Verify Service endpoints

```bash
kubectl get endpoints intern-task-app
```

This checks whether the Service has a destination Pod.

### Step 10 — Port forwarding

```bash
kubectl port-forward svc/intern-task-app 8080:80
```

Keep this terminal running.

Open another terminal.

Test the application:

```bash
curl -i http://127.0.0.1:8080/
```

Expected body:

```text
hello from intern-task
```

Test the health endpoint:

```bash
curl -i http://127.0.0.1:8080/healthz
```

Expected body:

```text
ok
```

Both endpoints should return HTTP 200.

---

## 6. Self-Healing Test

A Deployment should maintain the desired number of Pods.

We tested this by deleting the existing application Pod:

```bash
kubectl delete pod -l app=intern-task-app
```

Then we checked:

```bash
kubectl get pods -w
```

Kubernetes created a replacement Pod automatically.

This demonstrates the reconciliation behavior of Kubernetes controllers.

**Important:** The port-forward process may stop when its target Pod is deleted or replaced. Start port forwarding again before testing the application.

---

## 7. Important Lessons Learned

1. Docker and Kubernetes have different responsibilities.
2. A Deployment manages the desired state of application Pods.
3. A Service provides stable networking despite Pod replacement.
4. Labels connect Kubernetes resources.
5. Readiness and liveness probes serve different purposes.
6. Resource requests and limits help control resource allocation.
7. `ClusterIP` provides internal cluster networking.
8. `kubectl port-forward` allows local access without publicly exposing the Service.
9. Kubernetes controllers continuously reconcile actual state with desired state.
10. A successful Docker build does not guarantee a successful Kubernetes deployment. Both must be tested.

---

## 8. Useful Commands Reference

| Command                                             | Purpose                                    |
| --------------------------------------------------- | ------------------------------------------ |
| `kubectl get nodes`                                 | List Kubernetes nodes.                     |
| `kubectl get deployments`                           | List Deployments.                          |
| `kubectl get pods`                                  | List Pods.                                 |
| `kubectl get services`                              | List Services.                             |
| `kubectl get endpoints intern-task-app`             | Inspect Service endpoints.                 |
| `kubectl describe pod -l app=intern-task-app`       | Inspect Pod details and events.            |
| `kubectl logs deployment/intern-task-app`           | View application logs.                     |
| `kubectl rollout status deployment/intern-task-app` | Check rollout progress.                    |
| `kubectl delete pod -l app=intern-task-app`         | Test Pod replacement.                      |
| `kubectl apply -f k8s/`                             | Apply Kubernetes manifests.                |
| `kubectl delete -f k8s/`                            | Remove resources defined in the manifests. |
| `kind get clusters`                                 | List local kind clusters.                  |

---

## 9. Current Implementation Status

- [x] Docker image built successfully.
- [x] Docker container started successfully.
- [x] kind cluster created.
- [x] Docker image loaded into kind.
- [x] Kubernetes Deployment created.
- [x] Kubernetes Service created.
- [x] Pod reached Running and Ready state.
- [x] Readiness and liveness probes configured.
- [x] Resource requests and limits configured.
- [x] Application root endpoint tested.
- [x] Health endpoint tested.
- [x] Pod replacement tested successfully.

**Remaining:** Automated CI validation, final source review, Git commit, and pull request submission.

---

## 10. Engineering Reflection

The purpose of this exercise is not simply to make a Python application run inside Kubernetes.

It is to understand how containerized applications are deployed and operated through declarative infrastructure.

The Deployment defines the desired application state, while the Service provides a stable networking interface.

Together, these resources establish the foundation for running and managing applications in Kubernetes.
