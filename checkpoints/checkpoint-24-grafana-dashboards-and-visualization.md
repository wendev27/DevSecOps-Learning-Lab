# 📍 Checkpoint 24 — Grafana Dashboards and Visualization

## 🎯 Objective

Learn how monitoring data becomes useful through dashboards and visualizations. Understand how Grafana consumes Prometheus metrics and transforms raw numbers into graphs that help engineers monitor applications in real time.

---

## 📚 Topics Covered

- Grafana fundamentals
- Grafana dashboards
- Data sources
- Metric visualization
- Time-series monitoring
- CPU monitoring
- Memory monitoring
- Request monitoring
- PromQL queries

---

## 🤔 Questions Explored

- What problem does Grafana solve?
- How does Grafana connect to Prometheus?
- What is the difference between collecting metrics and visualizing them?
- Why are dashboards important in production systems?
- How can engineers detect problems from graphs?
- What does `rate()` actually measure?

---

## 🔬 Labs and Experiments

### Lab 1 — Connect Grafana to Prometheus

- Opened Grafana at:

```text
http://localhost:3001
```

- Added Prometheus as a data source.
- Verified that Grafana could successfully query Prometheus metrics.

---

### Lab 2 — Build a Monitoring Dashboard

Created dashboard panels for:

#### Memory Usage

```promql
process_resident_memory_bytes
```

#### CPU Usage

```promql
process_cpu_seconds_total
```

#### Total Requests

```promql
home_requests_total
```

---

### Lab 3 — Visualize Request Rate

Created a Requests Per Second panel using:

```promql
rate(home_requests_total[1m])
```

Learned that:

- `home_requests_total` shows the total number of requests.
- `rate()` calculates how quickly requests arrive.
- Grafana updates the graph in real time.

---

### Lab 4 — Generate Application Traffic

Generated traffic using:

```bash
for i in {1..100}; do
  curl http://localhost:3000
done
```

Observed:

- CPU usage increased.
- Memory usage changed over time.
- Request graphs produced spikes.

---

## 🧠 Key Concepts

### Grafana

Grafana is a visualization platform used to transform metrics into dashboards and charts.

---

### Dashboard

A dashboard groups multiple panels into a single view for monitoring system health.

---

### Visualization

Visualization converts raw numbers into graphs that humans can understand quickly.

---

### PromQL

PromQL is the query language used by Prometheus to analyze metrics.

Example:

```promql
rate(home_requests_total[1m])
```

This query asks:

> "How many requests per second occurred during the last minute?"

---

### Observability Pipeline

```text
┌─────────────┐
│ Node.js App │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  /metrics   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Prometheus  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Grafana   │
└─────────────┘
```

---

## 💭 Reflection

Monitoring does not end with collecting metrics.

Prometheus gathers information about the application, but Grafana makes that information understandable through dashboards and visualizations. By observing CPU usage, memory consumption, and request traffic in real time, it becomes easier to investigate performance issues and understand how systems behave under load.

This checkpoint demonstrated that observability is not only about data collection—it is also about presenting data in a way that engineers can quickly interpret.

---

## 🚀 Next Checkpoint

## ☁️ Phase 8 — Cloud & Orchestration

- [ ] Kubernetes
- [ ] Helm
- [ ] Cloud Deployment
- [ ] Infrastructure Best Practices
