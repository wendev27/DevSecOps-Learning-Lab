# Checkpoint 32 — Kubernetes LoadBalancer & Pod Networking

## 🎯 Objective

Understand how Kubernetes handles networking between Pods and how Services provide stable access to applications.

This checkpoint focuses on:

- Pod networking
- Service networking
- LoadBalancer Services
- Service discovery
- Kubernetes DNS
- CoreDNS
- The relationship between Services and Pods
- The difference between internal cluster networking and external exposure

The goal is to build a mental model of how traffic moves through a Kubernetes cluster instead of treating Pods, Services, and networking as isolated concepts.

---

## 📚 Topics Covered

- Kubernetes Pod networking
- Kubernetes Services
- ClusterIP
- NodePort
- LoadBalancer
- Service selectors
- Service endpoints
- Pod IP addresses
- Service IP addresses
- Kubernetes DNS
- CoreDNS
- Service discovery
- Internal cluster communication
- External Service exposure
- Local Kind networking limitations

---

## 🤔 Questions Explored

### 1. How do Pods communicate with each other?

Pods receive their own IP addresses and can communicate over the Kubernetes cluster network.

However, Pod IPs should not be treated as permanent application endpoints because Pods can be recreated and receive different IP addresses.

---

### 2. Why do we need Services?

A Kubernetes Service provides a stable networking endpoint for a group of Pods.

Instead of communicating directly with a Pod:

```text
Client
  |
  v
Pod IP

applications can communicate through a Service:

Client
  |
  v
Service
  |
  +----> Pod
  |
  +----> Pod
  |
  +----> Pod

The Service provides a stable abstraction while the Pods behind it can change.

3. What is a ClusterIP?

ClusterIP is the default Kubernetes Service type.

It provides an internal virtual IP address that can be used by workloads inside the cluster.

Example:

Service
hello-service
      |
      v
ClusterIP
10.96.79.100
      |
      +----> Pod
      |
      +----> Pod
      |
      +----> Pod

The ClusterIP is not intended to be directly accessible from the public Internet.

4. What is a LoadBalancer Service?

A LoadBalancer Service is designed to expose a Kubernetes Service externally.

Conceptually:

Internet
   |
   v
External Load Balancer
   |
   v
Kubernetes Service
   |
   v
Pods

In a cloud Kubernetes environment, the Kubernetes control plane can work with the cloud provider to provision an external load balancer.

The exact implementation depends on the Kubernetes environment.

5. Why doesn't LoadBalancer behave the same way in Kind?

The lab environment uses a local Kind Kubernetes cluster.

Kind does not automatically provide the same cloud-provider infrastructure available in managed Kubernetes services.

Therefore, creating a Service of type LoadBalancer in Kind does not automatically mean that a real cloud load balancer has been provisioned.

This distinction is important:

Managed Kubernetes

LoadBalancer Service
        |
        v
Cloud Provider
        |
        v
Real External Load Balancer

versus:

Local Kind

LoadBalancer Service
        |
        v
No Cloud Provider
        |
        v
No automatic cloud load balancer
6. How do Pods communicate with Services?

Pods can communicate with a Service using its stable Service IP or DNS name.

Instead of depending on:

10.x.x.x

for a specific Pod, an application can use:

hello-service

or the fully qualified Kubernetes DNS name:

hello-service.default.svc.cluster.local
7. How does Kubernetes DNS work?

Kubernetes provides internal DNS-based service discovery through CoreDNS.

A Service can be accessed using a DNS name based on:

<service>.<namespace>.svc.cluster.local

For example:

hello-service.default.svc.cluster.local

This allows applications to discover Services by name instead of manually tracking IP addresses.

🔬 Labs and Experiments
Lab 1 — Inspect Kubernetes Services

List the Services in the cluster:

kubectl get services

Example:

NAME           TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)
hello-service  ClusterIP   10.96.79.100    <none>        80/TCP

The important fields are:

TYPE — determines how the Service is exposed
CLUSTER-IP — stable virtual IP assigned to the Service
EXTERNAL-IP — external address when supported
PORT(S) — exposed Service ports
Lab 2 — Inspect the Service Configuration

Use:

kubectl describe service hello-service

This allows the Service configuration to be inspected, including:

Selector
ClusterIP
Ports
TargetPort
Endpoints

The selector determines which Pods belong to the Service.

Example:

selector:
  app: hello

The Service will route traffic to Pods matching that label.

Lab 3 — Inspect Pods

List the Pods:

kubectl get pods -o wide

The -o wide output exposes additional networking information such as Pod IP addresses and the node where each Pod is running.

Example:

NAME                     READY   STATUS    IP
hello-deployment-xxx     1/1     Running   10.244.x.x
hello-deployment-yyy     1/1     Running   10.244.x.x

This demonstrates that each Pod receives its own IP address.

Lab 4 — Compare Pod IP and Service IP

The important distinction is:

Pod IP

10.244.x.x

versus:

Service ClusterIP

10.96.x.x

The Pod IP identifies an individual Pod.

The ClusterIP identifies the Service.

Therefore:

Pod IP
    |
    +-- Individual workload
    +-- Can change when Pod is recreated


ClusterIP
    |
    +-- Stable Service endpoint
    +-- Routes traffic toward matching Pods
Lab 5 — Test Kubernetes DNS

A temporary test Pod was used to test internal DNS resolution:

kubectl run test-client \
  --rm \
  -it \
  --image=busybox:1.36 \
  --restart=Never \
  -- nslookup hello-service

The DNS lookup successfully resolved the Service name to its ClusterIP.

Example result:

Name:      hello-service
Address:   10.96.79.100

The fully qualified Service name can also be tested:

kubectl run test-client \
  --rm \
  -it \
  --image=busybox:1.36 \
  --restart=Never \
  -- nslookup hello-service.default.svc.cluster.local

This demonstrates that Kubernetes DNS can resolve a Service name to the Service's virtual IP.

Lab 6 — Understand the DNS Structure

The fully qualified Kubernetes Service name:

hello-service.default.svc.cluster.local

can be understood as:

hello-service
      |
      v
Service name

default
      |
      v
Namespace

svc
      |
      v
Kubernetes Service DNS zone

cluster.local
      |
      v
Cluster DNS domain

Therefore:

<service>.<namespace>.svc.cluster.local

is the general structure.

Lab 7 — Understand Service Routing

The Service does not simply point to one permanent Pod.

Instead, it uses selectors to identify matching Pods.

Example:

selector:
  app: hello

Pods:

labels:
  app: hello

The resulting relationship is:

                 Service
                    |
          selector: app=hello
                    |
        +-----------+-----------+
        |           |           |
        v           v           v
      Pod A       Pod B       Pod C

This allows Kubernetes to distribute Service traffic among the matching Pods.

Lab 8 — Explore LoadBalancer

A Service can be configured with:

type: LoadBalancer

Example:

apiVersion: v1
kind: Service
metadata:
  name: hello-loadbalancer
spec:
  type: LoadBalancer
  selector:
    app: hello
  ports:
    - port: 80
      targetPort: 80

Apply the configuration:

kubectl apply -f service.yaml

Inspect the Service:

kubectl get service hello-loadbalancer

In a cloud environment, Kubernetes can request an external load balancer.

In the local Kind environment, the EXTERNAL-IP may remain unavailable because there is no integrated cloud load-balancer provider.

🧪 Validation

The checkpoint was validated through Kubernetes inspection and networking experiments.

Service Inspection
kubectl get services

Confirmed that Kubernetes Services expose applications through stable Service endpoints.

Pod Inspection
kubectl get pods -o wide

Confirmed that Pods receive individual IP addresses.

Service Details
kubectl describe service hello-service

Used the Service configuration to understand:

Selector
ClusterIP
Ports
TargetPort
Endpoints
DNS Resolution

A temporary BusyBox Pod was used to test Kubernetes DNS resolution:

kubectl run test-client \
  --rm \
  -it \
  --image=busybox:1.36 \
  --restart=Never \
  -- nslookup hello-service

The Service name successfully resolved to its ClusterIP.

The observed Service address was:

10.96.79.100

The DNS server used by the Pod was:

10.96.0.10

This provided direct evidence that Kubernetes internal DNS-based Service discovery was working.

🧠 Key Concepts
1. Pod IP

A Pod IP identifies an individual Pod.

Pod
 |
 +-- Pod IP

Pod IPs are not intended to be treated as permanent application addresses.

2. Service IP

A Service receives a stable virtual IP called a ClusterIP.

Service
 |
 +-- ClusterIP

The Service uses selectors to route traffic to matching Pods.

3. Service Selector

A selector determines which Pods receive traffic.

selector:
  app: hello

Matching Pods become targets of the Service.

4. Endpoints

A Service needs actual backend Pods to send traffic to.

Conceptually:

Service
   |
   v
Endpoints
   |
   +----> Pod IP
   |
   +----> Pod IP
   |
   +----> Pod IP

The endpoint list can change as Pods are created, deleted, or replaced.

5. CoreDNS

CoreDNS provides DNS-based Service discovery inside the Kubernetes cluster.

Instead of using an IP address directly:

10.96.79.100

applications can use:

hello-service

or:

hello-service.default.svc.cluster.local
6. ClusterIP

ClusterIP provides internal access to a Service.

Pod
 |
 v
ClusterIP
 |
 v
Backend Pods

It is primarily intended for communication inside the cluster.

7. NodePort

NodePort exposes a Service through a port on each Kubernetes node.

Conceptually:

External Client
      |
      v
Node IP:NodePort
      |
      v
Service
      |
      v
Pods

NodePort provides a way to expose a Service through a node-level port.

8. LoadBalancer

LoadBalancer builds on the Service abstraction to provide external exposure when supported by the infrastructure.

Conceptually:

External Client
      |
      v
External Load Balancer
      |
      v
Kubernetes Service
      |
      v
Pods

The external load balancer itself is environment-dependent.

🔄 Networking Mental Model

The most important mental model from this checkpoint is:

                         External Traffic
                               |
                               v
                    +---------------------+
                    |   Load Balancer     |
                    +---------------------+
                               |
                               v
                    +---------------------+
                    | Kubernetes Service  |
                    +---------------------+
                               |
                         ClusterIP
                               |
                 +-------------+-------------+
                 |             |             |
                 v             v             v
              Pod A         Pod B         Pod C
              10.x.x.x      10.x.x.x      10.x.x.x

Inside the cluster:

Application
     |
     v
Service DNS
     |
     v
Service ClusterIP
     |
     v
Matching Pods

For example:

Application
     |
     v
hello-service
     |
     v
hello-service.default.svc.cluster.local
     |
     v
10.96.79.100
     |
     +--------> Pod A
     |
     +--------> Pod B
     |
     +--------> Pod C
🛡️ DevSecOps Perspective

Networking is also a security boundary.

Understanding how traffic moves through Kubernetes is important before introducing more advanced security controls.

A secure Kubernetes environment needs to answer questions such as:

Which Pods can communicate with each other?
Which Services are exposed externally?
Which ports are reachable?
Which workloads should remain internal?
Which workloads require external access?
How can unnecessary network access be restricted?

This checkpoint establishes the networking foundation required for future Kubernetes security topics such as:

NetworkPolicies
Ingress security
TLS
Service exposure controls
Zero-trust networking
Workload isolation

A Service provides connectivity, but connectivity should not automatically mean unrestricted access.

💭 Reflection

This checkpoint changed the way I think about Kubernetes networking.

Before understanding Services, it is easy to think of a Kubernetes application as simply:

Client
  |
  v
Pod

The more accurate model is:

Client
  |
  v
Service
  |
  v
Pods

Pods are temporary workloads.

Services provide stable networking.

DNS provides discoverability.

LoadBalancer provides a mechanism for external exposure when supported by the infrastructure.

The important separation is:

Workload
   |
   v
Pod

Stable networking
   |
   v
Service

Name resolution
   |
   v
CoreDNS

External exposure
   |
   v
LoadBalancer

This makes Kubernetes networking easier to reason about because each component has a specific responsibility.

The biggest lesson from this checkpoint is that applications should not depend on individual Pod IP addresses.

Instead, applications should communicate through stable Service endpoints and DNS names.

📌 Checkpoint Summary
Completed
 Understand Pod IP addresses
 Understand Service IP addresses
 Understand ClusterIP
 Understand NodePort
 Understand LoadBalancer
 Understand Service selectors
 Understand Service endpoints
 Understand Pod-to-Service communication
 Understand Kubernetes DNS
 Understand CoreDNS
 Verify Service DNS resolution
 Understand local Kind LoadBalancer limitations
 Build a complete Kubernetes networking mental model
📁 Files / Resources

Expected lab resources may include:

service.yaml
deployment.yaml
README.md

The exact files depend on the implementation of the networking lab.

🧹 Cleanup

Remove temporary test Pods:

kubectl delete pod test-client --ignore-not-found

Remove lab resources when finished:

kubectl delete -f service.yaml

If a Deployment was also created:

kubectl delete -f deployment.yaml
🚀 Next Checkpoint
Checkpoint 33 — Kubernetes ConfigMaps & Secrets

The next checkpoint will focus on separating application configuration from container images and understanding how Kubernetes manages configuration and sensitive values.

Topics:

ConfigMaps
Secrets
Environment variables
Secret values
Configuration injection
Volume-based configuration
Secret management
Configuration security
Kubernetes security considerations

The goal is to move from:

Networking

to:

Application Configuration
        +
Security

and continue building toward production-oriented Kubernetes and DevSecOps practices.
```
