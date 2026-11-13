# Checkpoint 30 — Kubernetes Scaling Deployments

## 🎯 Objective

Learn how Kubernetes scales applications horizontally by changing the desired number of Pod replicas.

The goal of this checkpoint was to understand how Deployments and ReplicaSets work together when an application's desired replica count changes, and to observe Kubernetes automatically create additional Pods to match that desired state.

---

## 📚 Topics Covered

- Deployment scaling
- Horizontal scaling
- ReplicaSets
- Desired state vs. current state
- Replica counts
- `kubectl scale`
- Observing Pods with `kubectl get pods -w`
- Deployment status
- ReplicaSet status
- Kubernetes reconciliation

---

## 🤔 Questions Explored

- What happens when a Deployment is scaled?
- Who actually creates the new Pods?
- What is the relationship between a Deployment and a ReplicaSet during scaling?
- What do `READY`, `DESIRED`, `CURRENT`, and `AVAILABLE` represent?
- How does Kubernetes determine when additional Pods are required?
- Why does changing the desired replica count cause Kubernetes to create additional Pods?
- Why is horizontal scaling useful?
- How does scaling demonstrate Kubernetes' declarative approach?

---

## 🔬 Labs and Experiments

### 1. Inspect the Existing Deployment

Verified the existing Deployment:

```bash
kubectl get deployments
```

The Deployment initially had one desired replica.

---

### 2. Inspect the ReplicaSet

Checked the ReplicaSet managed by the Deployment:

```bash
kubectl get replicasets
```

The ReplicaSet initially reported:

```text
DESIRED   CURRENT   READY
1         1         1
```

This demonstrated that the ReplicaSet was maintaining the desired number of Pods.

---

### 3. Scale the Deployment

Scaled the Deployment from one replica to three replicas:

```bash
kubectl scale deployment hello-deployment --replicas=3
```

Kubernetes responded:

```text
deployment.apps/hello-deployment scaled
```

---

### 4. Observe Pod Creation

Watched Kubernetes create the additional Pods:

```bash
kubectl get pods -w
```

The Deployment went from:

```text
1 Pod
```

to:

```text
3 Pods
```

Two additional Pods were automatically created by Kubernetes.

---

### 5. Verify Deployment Status

Used:

```bash
kubectl get deployments
```

The final state showed:

```text
READY        3/3
UP-TO-DATE   3
AVAILABLE    3
```

This confirmed that all three desired replicas were successfully running.

---

### 6. Verify ReplicaSet Status

Used:

```bash
kubectl get replicasets
```

The final state showed:

```text
DESIRED   CURRENT   READY
3         3         3
```

This confirmed that the ReplicaSet successfully reconciled the desired state of three Pods.

---

### 7. Verify the Pods

Used:

```bash
kubectl get pods
```

The final result showed three running Pods belonging to the Deployment.

The Pods shared the same Deployment and ReplicaSet identity while having unique generated Pod names.

---

## 🧠 Key Concepts

### Horizontal Scaling

Horizontal scaling means increasing or decreasing the number of application instances.

In Kubernetes:

```text
1 Pod
  ↓
3 Pods
```

Instead of making one server more powerful, Kubernetes runs additional instances of the application.

---

### Desired State

The Deployment defines how many replicas should exist.

For example:

```text
Desired replicas = 3
```

Kubernetes then works to make the actual cluster state match that desired state.

```text
Desired State
     |
     v
3 replicas
     |
     v
Kubernetes Controllers
     |
     v
Actual State
     |
     v
3 running Pods
```

---

### Deployment and ReplicaSet Relationship

Scaling does not require manually creating Pods.

The relationship is:

```text
Deployment
     |
     v
ReplicaSet
     |
     v
Pods
     |
     v
Containers
```

The Deployment manages the ReplicaSet.

The ReplicaSet is responsible for maintaining the desired number of Pods.

---

### Reconciliation

When the desired number of replicas changes:

```text
Desired = 3
Current = 1
```

Kubernetes detects the difference:

```text
2 replicas missing
```

The ReplicaSet then creates the required Pods:

```text
Pod 1
Pod 2
Pod 3
```

until:

```text
Desired = 3
Current = 3
```

The cluster has reached the desired state.

---

### Deployment Status

The Deployment status provides several useful indicators:

```text
READY
UP-TO-DATE
AVAILABLE
```

For example:

```text
READY       3/3
UP-TO-DATE  3
AVAILABLE   3
```

This indicates that the Deployment has three desired replicas, all three have been updated, and all three are available.

---

### ReplicaSet Status

The ReplicaSet provides:

```text
DESIRED
CURRENT
READY
```

For example:

```text
DESIRED   3
CURRENT   3
READY     3
```

This means the ReplicaSet wants three Pods, currently has three Pods, and all three are ready.

---

## 🔄 Scaling Mental Model

The main mental model from this checkpoint is:

```text
User changes desired state

        |
        v

Deployment
replicas: 1 → 3

        |
        v

ReplicaSet detects mismatch

        |
        v

Creates additional Pods

        |
        v

1 Pod → 3 Pods

        |
        v

Desired State = Actual State
```

The important point is that the user does **not** manually create the additional Pods.

The user changes the desired state, and Kubernetes controllers perform the work required to reach it.

---

## 🧪 Validation

The scaling operation was successfully validated using:

```bash
kubectl scale deployment hello-deployment --replicas=3
```

Pod creation was observed using:

```bash
kubectl get pods -w
```

Deployment status was verified using:

```bash
kubectl get deployments
```

ReplicaSet status was verified using:

```bash
kubectl get replicasets
```

The final state confirmed:

```text
Deployment
3/3 READY

ReplicaSet
3 DESIRED
3 CURRENT
3 READY

Pods
3 Running
```

This confirmed that Kubernetes successfully reconciled the cluster to the requested replica count.

---

## 🧩 Mental Model

The complete scaling relationship can be represented as:

```text
              Desired State
                   |
                   v
          Deployment
          replicas: 3
                   |
                   v
              ReplicaSet
                   |
          +--------+--------+
          |        |        |
          v        v        v
        Pod 1    Pod 2    Pod 3
          |        |        |
          v        v        v
       Container Container Container
```

The important idea is:

```text
Deployment
    ↓
defines desired replicas

ReplicaSet
    ↓
maintains desired replicas

Pods
    ↓
run the application
```

---

## 🛠️ Commands Practiced

### Scale a Deployment

```bash
kubectl scale deployment hello-deployment --replicas=3
```

### Watch Pods

```bash
kubectl get pods -w
```

### Inspect Deployments

```bash
kubectl get deployments
```

### Inspect ReplicaSets

```bash
kubectl get replicasets
```

### Inspect Pods

```bash
kubectl get pods
```

---

## 💭 Reflection

This checkpoint made Kubernetes' orchestration model much more concrete.

Instead of manually creating additional containers, I only changed the desired replica count:

```text
1 → 3
```

Kubernetes automatically created the additional Pods needed to reach that state.

The most important realization was understanding that the Deployment does not directly create the Pods.

The relationship is:

```text
Deployment
     ↓
ReplicaSet
     ↓
Pods
```

The Deployment manages the desired application state, while the ReplicaSet works to ensure that the required number of Pods exists.

This experiment also helped me understand why Kubernetes is described as a declarative system. I declared what I wanted:

```text
3 replicas
```

and Kubernetes handled the steps required to make the actual cluster state match that declaration.

---

## 📌 Checkpoint Status

- [x] Deployment Scaling
- [x] Horizontal Scaling
- [x] ReplicaSets
- [x] Desired State vs. Current State
- [x] `kubectl scale`
- [x] Pod Scaling Observation
- [x] Deployment Status
- [x] ReplicaSet Status
- [x] Kubernetes Reconciliation

---

## 🚀 Next Checkpoint

### Checkpoint 31 — Kubernetes Deployments & Services

Next, I will learn how Kubernetes Services provide stable networking for Pods and how Services use Labels and Selectors to discover the correct application workloads.

Topics will include:

- Labels
- Selectors
- ClusterIP
- NodePort
- Exposing Deployments
- Service networking
