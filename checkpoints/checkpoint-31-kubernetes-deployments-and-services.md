# Checkpoint 31 — Kubernetes Deployments & Services

## 🎯 Objective

Understand how Kubernetes Services provide stable networking for applications managed by Deployments.

The goal of this checkpoint was to connect the concepts learned from Deployments and Pods with Kubernetes Services, and understand how Labels, Selectors, ClusterIP, and NodePort allow traffic to reach dynamic Pods without relying directly on Pod IP addresses.

---

## 📚 Topics Covered

### Deployment Integration

- Connecting Services to Deployments
- Using Deployment Pod labels
- Understanding Service-to-Pod relationships

### Services

- Labels
- Selectors
- ClusterIP
- NodePort
- Exposing Deployments
- Service Endpoints
- `kubectl port-forward`

---

## 🤔 Questions Explored

- Why can't applications rely directly on Pod IP addresses?
- What problem does a Kubernetes Service solve?
- How does a Service know which Pods belong to it?
- What are Labels?
- What are Selectors?
- How does a Service use a Selector to discover Pods?
- What is a ClusterIP?
- What is the difference between a Pod IP and a Service IP?
- What is a NodePort?
- How does NodePort differ from ClusterIP?
- How can a Kubernetes Service expose a Deployment?
- How does `kubectl port-forward` allow local access to a Service?
- What happens to Service connectivity when Pods are recreated?

---

## 🔬 Labs and Experiments

### 1. Inspect Deployment Pods

Inspected the Pods managed by the existing Deployment:

```bash
kubectl get pods --show-labels
```

Observed that the Pods contained the label:

```text
app=hello
```

This label became the connection point between the Deployment's Pods and the Kubernetes Service.

---

### 2. Filter Pods Using Labels

Used:

```bash
kubectl get pods -l app=hello
```

This demonstrated that Kubernetes can locate Pods based on their labels rather than their generated Pod names.

---

### 3. Inspect the Deployment Selector

Used:

```bash
kubectl describe deployment hello-deployment
```

Observed:

```text
Selector: app=hello
```

The Deployment's Pod template also contained:

```text
Labels: app=hello
```

This demonstrated the relationship between Labels and Selectors.

---

### 4. Create a ClusterIP Service

Created a Service that selected the Deployment's Pods:

```yaml
apiVersion: v1
kind: Service

metadata:
  name: hello-service

spec:
  selector:
    app: hello

  ports:
    - port: 80
      targetPort: 80

  type: ClusterIP
```

Applied the Service using:

```bash
kubectl apply -f service.yaml
```

---

### 5. Inspect the Service

Used:

```bash
kubectl get services
```

and:

```bash
kubectl describe service hello-service
```

Observed that the Service received a ClusterIP:

```text
10.96.79.100
```

The Service also reported endpoints corresponding to the Nginx Pods.

Example:

```text
10.244.0.5:80
10.244.0.6:80
10.244.0.7:80
```

This demonstrated that the Service successfully discovered the Pods using:

```text
selector: app=hello
```

---

### 6. Convert the Service to NodePort

Changed the Service from:

```yaml
type: ClusterIP
```

to:

```yaml
type: NodePort
```

The Service was then exposed through a NodePort.

Verified using:

```bash
kubectl get services
```

The Service displayed a port mapping similar to:

```text
80:32322/TCP
```

This demonstrated that NodePort exposes the Service through a port on the Kubernetes node.

---

### 7. Expose the Service Using Port Forwarding

Used:

```bash
kubectl port-forward service/hello-service 8080:80
```

This created a temporary connection:

```text
localhost:8080
        |
        v
hello-service:80
        |
        v
Nginx Pods
```

The Nginx application was successfully accessed through the browser.

---

## 🧠 Key Concepts

### Labels

Labels are key-value pairs attached to Kubernetes resources.

Example:

```yaml
labels:
  app: hello
```

They provide a way to organize and identify resources.

---

### Selectors

Selectors allow Kubernetes resources to find other resources based on labels.

Example:

```yaml
selector:
  app: hello
```

This means:

```text
Find Pods where:

app = hello
```

The Service does not need to know the names of individual Pods.

---

### Service

A Service provides a stable networking endpoint for a group of Pods.

Instead of:

```text
Client
   |
   v
Pod IP
```

the application uses:

```text
Client
   |
   v
Service
   |
   v
Pods
```

This allows Pods to be replaced without requiring clients to know their new IP addresses.

---

### ClusterIP

ClusterIP provides an internal virtual IP address for a Service.

Example:

```text
hello-service
      |
      v
10.96.79.100
```

The Service then routes traffic to the Pods selected by:

```text
app=hello
```

---

### Pod IP vs Service IP

A Pod has an individual IP:

```text
10.244.x.x
```

A Service has a stable virtual IP:

```text
10.96.x.x
```

The important distinction is:

```text
Pod IP
    ↓
Individual workload
    ↓
Can change when Pod is recreated


Service IP
    ↓
Stable application endpoint
    ↓
Routes traffic to matching Pods
```

---

### NodePort

NodePort exposes a Service through a port on the Kubernetes node.

Conceptually:

```text
External Client
      |
      v
NodeIP:NodePort
      |
      v
Service
      |
      v
Pods
```

NodePort provides a way to expose a Service outside the cluster without requiring clients to communicate directly with Pod IPs.

---

### Service Endpoints

Endpoints represent the actual Pods currently receiving traffic from a Service.

The relationship is:

```text
Service
   |
   | selector: app=hello
   |
   v
Endpoints
   |
   +----> Pod A
   |
   +----> Pod B
   |
   +----> Pod C
```

If Pods are recreated, the set of endpoints can change while the Service remains stable.

---

### Port Forwarding

`kubectl port-forward` creates a temporary connection from the local machine to a Kubernetes resource.

Example:

```bash
kubectl port-forward service/hello-service 8080:80
```

The resulting flow is:

```text
Browser
   |
   v
localhost:8080
   |
   v
kubectl port-forward
   |
   v
hello-service:80
   |
   v
Nginx Pods
```

This is especially useful for local development and testing.

---

## 🔄 Deployment + Service Mental Model

This checkpoint connected the Deployment and Service concepts:

```text
                    Deployment
                         |
                         v
                    ReplicaSet
                         |
              +----------+----------+
              |          |          |
              v          v          v
            Pod A      Pod B      Pod C
              |          |          |
              +----------+----------+
                         |
                    app=hello
                         |
                         v
                   Service
                         |
                    ClusterIP
                         |
                         v
                    Client
```

The Service does not care about the generated names of the Pods.

It uses:

```text
selector:
  app: hello
```

to dynamically discover the correct workloads.

---

## 🧪 Validation

The Service configuration was validated using:

```bash
kubectl get services
```

The Service details were inspected using:

```bash
kubectl describe service hello-service
```

Pod labels were inspected using:

```bash
kubectl get pods --show-labels
```

Pods matching the Service selector were confirmed using:

```bash
kubectl get pods -l app=hello
```

The Service endpoints were verified through:

```bash
kubectl describe service hello-service
```

The application was successfully exposed locally using:

```bash
kubectl port-forward service/hello-service 8080:80
```

The Nginx application was successfully accessed through the browser.

---

## 🛠️ Commands Practiced

### Inspect Pods and Labels

```bash
kubectl get pods --show-labels
```

### Filter Pods by Label

```bash
kubectl get pods -l app=hello
```

### Inspect Deployment

```bash
kubectl describe deployment hello-deployment
```

### Create / Update Service

```bash
kubectl apply -f service.yaml
```

### Inspect Services

```bash
kubectl get services
```

### Inspect Service Details

```bash
kubectl describe service hello-service
```

### Forward Local Traffic

```bash
kubectl port-forward service/hello-service 8080:80
```

---

## 🧩 Mental Model

The most important mental model from this checkpoint is:

```text
Pod
 ↓
has a label

Service
 ↓
uses a selector

Selector
 ↓
finds matching Pods

Service
 ↓
provides stable networking

Client
 ↓
communicates with the Service
```

The application does not need to know:

```text
Pod A IP
Pod B IP
Pod C IP
```

Instead, it can communicate through:

```text
hello-service
```

This allows the underlying Pods to remain dynamic.

---

## 🛡️ DevSecOps Perspective

Service exposure should always be intentional.

Different Service types provide different levels of accessibility:

```text
ClusterIP
   ↓
Internal access


NodePort
   ↓
Node-level external access


LoadBalancer
   ↓
External infrastructure
```

A production system should avoid exposing services unnecessarily.

Understanding Service networking is therefore important for future Kubernetes security topics such as:

- NetworkPolicies
- Ingress security
- TLS
- Service exposure controls
- Workload isolation
- Network segmentation

---

## 💭 Reflection

This checkpoint connected the Kubernetes workload model with Kubernetes networking.

Previously, the Deployment and its Pods could be viewed as:

```text
Deployment
    |
    v
ReplicaSet
    |
    v
Pods
```

After this checkpoint, the application could be accessed through:

```text
Client
    |
    v
Service
    |
    v
Pods
```

The biggest realization was understanding why Services use Labels and Selectors instead of relying on Pod names.

Pods are dynamic resources.

Their names and IP addresses can change.

The Service remains stable and discovers the correct Pods through their labels.

The successful browser test using:

```bash
kubectl port-forward service/hello-service 8080:80
```

made the entire concept practical because the request traveled through an actual Kubernetes Service and reached the Nginx application running inside the cluster.

---

## 📌 Checkpoint Status

### Deployment Integration

- [x] Connect Service to Deployment Pods
- [x] Inspect Deployment Pod labels
- [x] Understand Deployment → ReplicaSet → Pod relationship

### Services

- [x] Labels
- [x] Selectors
- [x] ClusterIP
- [x] NodePort
- [x] Service Endpoints
- [x] Exposing Deployments
- [x] `kubectl port-forward`

---

## 🚀 Next Checkpoint

### Checkpoint 32 — Kubernetes LoadBalancer & Pod Networking

Next, I will explore how Kubernetes handles broader networking concepts and external Service exposure.

Topics will include:

- LoadBalancer Services
- Pod Networking
- Kubernetes DNS
- CoreDNS
- Service Discovery
- Pod-to-Service communication
- Kubernetes networking mental model
