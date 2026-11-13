# Checkpoint 29 — Kubernetes Deployments

## 🎯 Objective

Understand the purpose of Kubernetes Deployments and how they provide a higher-level way to manage application Pods.

The goal of this checkpoint was to move beyond manually creating individual Pods and understand how Kubernetes uses Deployments and ReplicaSets to manage application workloads.

---

## 📚 Topics Covered

- Deployment Fundamentals
- Desired State
- Deployment Manifests
- Deployment Controllers
- ReplicaSets
- Deployment → ReplicaSet → Pod relationship
- Inspecting Deployments
- Inspecting ReplicaSets
- Inspecting Pods managed by a Deployment

---

## 🤔 Questions Explored

- What problem does a Kubernetes Deployment solve?
- Why use a Deployment instead of creating a standalone Pod?
- What is the relationship between a Deployment, ReplicaSet, and Pod?
- What does "desired state" mean in Kubernetes?
- How does a Deployment create and manage Pods?
- What role does a ReplicaSet play?
- How can we inspect the resources created by a Deployment?
- Why is the Deployment considered a higher-level Kubernetes abstraction?

---

## 🔬 Labs and Experiments

### 1. Create a Kubernetes Deployment

Created a Deployment manifest containing:

- Deployment name
- Pod template
- Container name
- Container image
- Container port
- Pod labels
- Replica configuration

Applied the Deployment using:

```bash
kubectl apply -f deployment.yaml

Kubernetes successfully created the Deployment.

2. Inspect the Deployment

Inspected the Deployment using:

kubectl get deployments

and:

kubectl describe deployment hello-deployment

Observed information including:

Deployment name
Desired replicas
Updated replicas
Available replicas
Deployment selector
Pod template
Container configuration
ReplicaSet associated with the Deployment
3. Inspect the ReplicaSet

Used:

kubectl get replicasets

to identify the ReplicaSet created by the Deployment.

The relationship observed was:

Deployment
     |
     v
ReplicaSet
     |
     v
Pod

The Deployment acts as the higher-level controller while the ReplicaSet manages the Pods created from the Deployment's Pod template.

4. Inspect the Pods

Used:

kubectl get pods

to observe the Pods created by the Deployment.

The generated Pod name demonstrated that the Pod was created and managed through the Deployment and ReplicaSet hierarchy.

The resulting architecture was:

Deployment
     |
     v
ReplicaSet
     |
     v
Pod
     |
     v
Container
🧠 Key Concepts
Deployment

A Deployment is a Kubernetes controller used to manage application workloads.

Instead of manually managing individual Pods, the Deployment describes the desired state of the application.

For example:

Application
     |
     v
Deployment
     |
     v
ReplicaSet
     |
     v
Pods
Desired State

Kubernetes works by defining the state that the application should have.

The Deployment describes this desired state through its configuration.

Conceptually:

Desired State
      |
      v
Deployment
      |
      v
Kubernetes Controllers
      |
      v
Actual Cluster State

Kubernetes controllers continuously work toward making the actual cluster state match the desired state.

ReplicaSet

A ReplicaSet is responsible for maintaining the desired number of Pods associated with its Pod template.

The Deployment creates and manages the ReplicaSet.

Deployment
     |
     v
ReplicaSet
     |
     v
Pods

This separation allows Kubernetes to manage application workloads through controllers rather than requiring the user to manually manage individual Pods.

Pod Template

The Deployment contains a Pod template describing how the Pods should be created.

Example:

spec:
  template:
    metadata:
      labels:
        app: hello

    spec:
      containers:
        - name: nginx-container
          image: nginx:latest
          ports:
            - containerPort: 80

The template becomes the blueprint used when the ReplicaSet creates Pods.

Resource Hierarchy

The most important relationship learned in this checkpoint was:

Deployment
     |
     | manages
     v
ReplicaSet
     |
     | creates/manages
     v
Pod
     |
     | runs
     v
Container

Each layer has a different responsibility.

🧪 Validation

The Deployment was successfully created and inspected using:

kubectl apply -f deployment.yaml
kubectl get deployments
kubectl describe deployment hello-deployment
kubectl get replicasets
kubectl get pods

The resulting resources confirmed that Kubernetes created the expected Deployment, ReplicaSet, and Pod hierarchy.

🧩 Mental Model

The main mental model from this checkpoint is:

        Desired Application State
                  |
                  v
             Deployment
                  |
                  v
              ReplicaSet
                  |
                  v
                 Pod
                  |
                  v
              Container

Instead of thinking:

"I need to manually create a container."

Kubernetes encourages thinking:

"This is the state I want my application to have."

The Kubernetes controllers then work toward maintaining that state.

💭 Reflection

This checkpoint was my first deeper look into Kubernetes controllers.

Before working with Deployments, I mainly thought of a Pod as the unit that runs my application.

After this checkpoint, I understood that Pods are only one layer of the Kubernetes workload model.

The Deployment provides the desired application configuration, while the ReplicaSet manages the Pods created from that configuration.

The relationship became much clearer after inspecting the resources directly:

Deployment
    ↓
ReplicaSet
    ↓
Pod
    ↓
Container

This also helped me understand why Kubernetes is more than simply running containers. It provides a control system that manages the desired state of applications.

📌 Checkpoint Status
 Deployment Fundamentals
 Desired State
 Deployment Manifest
 ReplicaSets
 Deployment → ReplicaSet → Pod relationship
 Inspect Deployments
 Inspect ReplicaSets
 Inspect Pods
🚀 Next Checkpoint
Checkpoint 30 — Kubernetes Scaling Deployments

Next, I will explore how Kubernetes Deployments can scale applications by changing the desired number of replicas.

Topics will include:

Scaling Deployments
Replica counts
Desired vs actual state
Creating additional Pods
Observing ReplicaSet behavior during scaling
```
