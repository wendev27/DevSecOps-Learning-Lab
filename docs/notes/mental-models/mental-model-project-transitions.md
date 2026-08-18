# 🧠 Mental Model: Project Transitions

> The goal of this roadmap is not to learn technologies in isolation, but to understand how they connect to build secure, observable, and production-ready systems.

As the projects become more complex, the focus shifts from learning individual tools to understanding how entire systems operate in real-world environments.

---

# 📈 Learning Progression

| Project                               | Main Focus               | What Comes Back                                                              |
| ------------------------------------- | ------------------------ | ---------------------------------------------------------------------------- |
| **DevSecOps-Learning-Lab**            | Learn the tools          | Docker, CI/CD, Trivy, Nginx, HTTPS, monitoring                               |
| **Secured-Payment-Paymongo-Practice** | Security and payments    | Secrets, webhooks, OWASP, HTTPS, audit logs                                  |
| **DevOps-War-Room**                   | Real-time infrastructure | WebSockets, observability, Grafana, Prometheus, load testing                 |
| **Sentinel-Core**                     | Production-grade systems | Distributed systems, queues, event-driven architecture, monitoring, security |

---

# 🔄 The Transition Between Projects

Each project builds on the previous one.

The purpose is not:

```text
Learn Docker.
Finish Docker.
Forget Docker.

Learn monitoring.
Finish monitoring.
Forget monitoring.
```

The actual progression looks like this:

```text
DevSecOps-Learning-Lab
        ↓
Secured-Payment-Paymongo-Practice
        ↓
DevOps-War-Room
        ↓
Sentinel-Core
```

Every new project introduces additional complexity while reusing concepts learned in earlier stages.

---

# 🔧 Phase 1 — Learning Individual Tools

## DevSecOps-Learning-Lab

This project focuses on understanding the fundamentals:

- Linux
- Git and GitHub
- Docker and Docker Compose
- CI/CD pipelines
- Static and dynamic security testing
- Reverse proxies
- HTTPS and certificates
- Secrets management
- Logging and observability

### Core question:

> "How does each tool work?"

---

# 🔐 Phase 2 — Security in Real Applications

## Secured-Payment-Paymongo-Practice

This project introduces production concerns around financial systems.

Concepts that return:

- Environment variables
- API security
- Webhooks
- Signature verification
- HTTPS
- Audit logging
- OWASP practices
- Secure deployment

### Core question:

> "How do we protect sensitive workflows?"

---

# 📡 Phase 3 — Operating Real-Time Systems

## DevOps-War-Room

This project focuses on systems that continuously exchange information.

Concepts that return:

- WebSockets
- Health checks
- Logging
- Prometheus
- Grafana
- Metrics collection
- Load testing
- Container orchestration

### New questions:

- How many users are connected?
- Which server is overloaded?
- How much memory is being used?
- How can failures be detected in real time?

---

# 🚀 Phase 4 — Production-Grade Architecture

## Sentinel-Core

This project moves beyond individual services and explores distributed systems.

Concepts that return:

- Background workers
- Event queues
- Event-driven architecture
- Retry mechanisms
- Observability
- Security
- Monitoring
- Scalability

### New questions:

- Which worker processed the event?
- How long did processing take?
- Where did the failure occur?
- How many retries happened?
- What is the system bottleneck?

---

# 🏗️ Evolution of Monitoring

Monitoring evolves as the projects evolve.

### In the learning lab:

```text
Application
    ↓
Logs
    ↓
Prometheus
    ↓
Grafana
```

Focus:

- Is the application healthy?
- Are requests arriving?
- What metrics are available?

---

### In DevOps-War-Room:

```text
Users
    ↓
WebSocket Server
    ↓
Metrics
    ↓
Dashboards
```

Focus:

- Active connections
- Throughput
- Latency
- Resource consumption

---

### In Sentinel-Core:

```text
API
    ↓
Queue
    ↓
Worker
    ↓
Database
```

Focus:

- Event processing
- Retries
- Failures
- System bottlenecks

---

# 🎯 The Real Goal

The objective of these projects is not simply to accumulate technologies.

The objective is to develop the ability to answer questions such as:

- What happens when a request enters the system?
- How do services communicate?
- How are failures detected?
- How are systems secured?
- How can engineers observe production behavior?
- How do systems scale?

---

# 💡 Final Mental Model

```text
Tools
    ↓
Applications
    ↓
Infrastructure
    ↓
Distributed Systems
    ↓
Production Thinking
```

Learning technologies is the beginning.

Understanding how they work together is the real destination.
