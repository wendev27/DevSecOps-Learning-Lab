# Checkpoint 25 — Monitoring & Observability

## Completed

- [x] Application health checks
- [x] Structured logging fundamentals
- [x] Metrics collection with Prometheus
- [x] Grafana dashboard creation
- [x] Prometheus ↔ Grafana integration
- [x] CPU monitoring
- [x] Memory monitoring
- [x] HTTP request monitoring
- [x] Custom application metrics
- [x] Alert rule creation
- [x] Alert thresholds
- [x] Alert state testing
- [x] Container observability fundamentals
- [x] Incident investigation workflow

---

## Learned Conceptually

- [x] Notification channels (Discord, Slack, Email, PagerDuty)
- [x] Incident response basics
- [x] On-call alert flow
- [x] Escalation workflows

---

## Key Takeaways

- Metrics tell you what is happening.
- Logs help explain why it happened.
- Alerts notify humans when action is needed.
- Dashboards provide visibility into system health.
- Containers are ephemeral; persistent data requires volumes.
- Monitoring is useful only when someone receives and acts on alerts.

---

## Architecture

Application
↓
Prometheus
↓
Grafana
↓
Alerts
↓
Notification Channels
↓
Engineers
