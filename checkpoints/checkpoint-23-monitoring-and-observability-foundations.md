# 📍 Checkpoint 23 — Monitoring with Prometheus Metrics

## 🎯 Objective

Learn how application metrics are exposed and collected in a monitoring pipeline using Prometheus. Understand how backend services publish operational data and how monitoring systems consume that information.

---

## 📚 Topics Covered

- Application logging
- Health check endpoints
- Docker health checks
- Prometheus installation
- Prometheus configuration
- Metrics endpoints
- Prometheus scraping
- Node.js metrics
- Observability basics

---

## 🤔 Questions Explored

- What is observability?
- What is Prometheus?
- Why do applications expose a `/health` endpoint?
- Why do applications expose a `/metrics` endpoint?
- How do Docker health checks work?
- How does Prometheus collect metrics?
- What is the difference between logs, health checks, and metrics?
- What information can Node.js expose?
- What is event loop lag?
- How does monitoring help in production systems?

---

## 🔬 Labs and Experiments

### Lab 1: Application Logging

Observed application logs from the Node.js container.

```bash
docker compose logs
```

Learned how logs help developers understand application behavior and debug problems.

---

### Lab 2: Health Check Endpoint

Visited:

```text
http://localhost:3000/health
```

Verified that the application exposes a dedicated endpoint that reports its health status.

---

### Lab 3: Docker Health Checks

Configured Docker health checks inside `compose.yaml`.

Observed container health states:

```text
healthy
unhealthy
starting
```

Inspected container health:

```bash
docker ps
```

Learned how Docker automatically verifies whether containers are functioning correctly.

---

### Lab 4: Start the Monitoring Stack

Started the monitoring environment using Docker Compose.

```bash
docker compose up --build
```

Verified that both the Node.js application and Prometheus containers were running correctly.

---

### Lab 5: Configure Prometheus

Created:

```text
prometheus/prometheus.yml
```

Configured Prometheus to scrape metrics from:

```text
app:3000
```

Learned how Docker networking allows containers to communicate by service name.

---

### Lab 6: Explore the Metrics Endpoint

Opened:

```text
http://localhost:3000/metrics
```

Observed raw Prometheus metrics such as:

```text
process_cpu_user_seconds_total
process_cpu_system_seconds_total
process_resident_memory_bytes
nodejs_eventloop_lag_seconds
nodejs_active_resources_total
nodejs_heap_size_total_bytes
```

Learned how applications expose operational data for monitoring systems.

---

### Lab 7: Understand the Monitoring Flow

Mapped the complete monitoring architecture:

```text
User Request
     ↓
Node.js Application
     ↓
Logs + Health Checks + Metrics
     ↓
Prometheus
     ↓
Time-Series Database
     ↓
Grafana Dashboard
```

## 💭 Reflection

This checkpoint transformed monitoring from an abstract DevOps concept into something tangible. I learned that observability is not just about dashboards—it starts inside the application itself.

I explored three different layers of monitoring:

- Logs for debugging application behavior.
- Health checks for determining service availability.
- Metrics for measuring performance over time.

The `/metrics` endpoint initially looked like unreadable text, but I now understand that it represents the raw data consumed by Prometheus and visualized by Grafana.

This checkpoint showed me how applications, Docker, and monitoring systems work together to build observable and production-ready systems.

---

## 🚀 Next Checkpoint

- Install and configure Grafana.
- Connect Grafana to Prometheus.
- Build dashboards.
- Visualize CPU, memory, and application metrics.
- Learn basic PromQL queries.
- Explore real-time observability.

---
