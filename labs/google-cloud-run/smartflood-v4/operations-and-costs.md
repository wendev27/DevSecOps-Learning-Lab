# SmartFlood V4 — Operations and Costs

## 1. Overview

This document describes how to operate, monitor, troubleshoot, and manage the
costs of the SmartFlood V4 deployment.

It focuses on the deployed application and the operational practices needed to
keep it observable, reliable, and maintainable.

**Important:** Distinguish between existing capabilities, verified behavior,
and proposed improvements. Do not mark a feature as implemented until it has
been checked.

## 2. Deployment Inventory

| Component            | Hosting                                                | Operational status  |
| -------------------- | ------------------------------------------------------ | ------------------- |
| Frontend             | Vercel (reported; verify current deployment)           | Needs verification  |
| Backend API          | Google Cloud Run (reported; verify current deployment) | Needs verification  |
| AI service           | Hosting to be confirmed                                | Needs investigation |
| Database             | Provider and configuration to be confirmed             | Needs investigation |
| External AI provider | To be confirmed                                        | Needs investigation |

Record the deployed service names, regions, URLs, and dependencies after
checking the actual environment.

Do not include credentials or secret values.

## 3. Observability

Observability helps us understand what the application is doing and why
problems occur.

### Logging

Review the logs available for each deployed service.

For Cloud Run, investigate Cloud Logging for:

- Application errors and exceptions.
- Failed requests and HTTP status codes.
- Startup and shutdown messages.
- Dependency connection failures.
- AI provider request failures.
- Timeouts and unexpected restarts.

Record which logs are available and whether they have been tested during a
real request.

### Metrics

Identify which metrics are available for the deployed services.

Potential metrics include:

- Request count and request rate.
- HTTP error rate.
- Request latency.
- Container CPU and memory utilization.
- Instance count and scaling behavior.
- Database connection failures.
- External AI provider latency and errors.

Do not claim that a metric or dashboard is configured until you have verified
it.

### Alerts

Document whether alerts exist for:

- Repeated application failures.
- High request latency.
- Unexpected resource consumption.
- Service availability problems.
- Approaching budget thresholds.

A budget alert is a notification mechanism, not a hard spending limit.

## 4. Health Checks and Availability

Determine how the application indicates that its services are healthy.

| Component   | Check                                                           | Status             |
| ----------- | --------------------------------------------------------------- | ------------------ |
| Frontend    | Load the deployed application and verify key pages              | Needs verification |
| Backend API | Test a documented endpoint or health endpoint, if available     | Needs verification |
| AI service  | Test its documented health endpoint, if available               | Needs verification |
| Database    | Verify connectivity through an authorized application operation | Needs verification |

Use existing endpoints where possible. Do not assume that `/health`, `/healthz`,
or another conventional path exists.

A successful health endpoint does not necessarily prove that every dependency
is working correctly.

## 5. Troubleshooting Workflow

When a deployment or request fails, use a consistent process.

1. Record the error message, timestamp, affected component, and request details.
2. Determine whether the issue affects the frontend, backend API, AI service,
   database, or an external dependency.
3. Inspect the relevant logs and request status codes.
4. Check recent code, configuration, and deployment changes.
5. Verify service URLs, permissions, network access, and required configuration.
6. Reproduce the problem safely where possible.
7. Apply the smallest appropriate fix.
8. Re-test the affected functionality.
9. Document the root cause and prevention steps.

Never paste secret values into logs, tickets, commits, or documentation.

## 6. Cloud Run Scaling and Reliability

Review the actual Cloud Run configuration for each deployed service.

| Setting or behavior | What to investigate                                           |
| ------------------- | ------------------------------------------------------------- |
| Minimum instances   | Whether keeping instances warm is necessary                   |
| Maximum instances   | Whether a cap is configured and appropriate                   |
| Concurrency         | How many requests an instance can handle safely               |
| CPU allocation      | When CPU is allocated and what the workload requires          |
| Memory              | Whether configured memory is sufficient                       |
| Request timeout     | Whether long-running operations can complete safely           |
| Startup time        | Whether cold starts affect user experience                    |
| Region              | Whether the selected region fits latency and dependency needs |
| Authentication      | Whether service access matches the intended trust boundary    |

These settings affect reliability, performance, and cost. Their appropriate
values depend on the workload and must be measured rather than guessed.

For AI workloads, also investigate model latency, request duration, and
external provider rate limits.

## 7. Cost Awareness

Cloud costs depend on actual usage, service configuration, and the pricing
rules of each provider.

Potential cost sources include:

- Cloud Run requests, compute usage, and instance configuration.
- Container image storage and artifact storage.
- Cloud Logging ingestion and retention.
- Network traffic and data transfer.
- Database compute, storage, and backups.
- External AI provider API usage.
- Frontend hosting and any paid platform features.

Do not assume that a service is free simply because it uses a serverless
deployment model.

### Cost review checklist

- [ ] Identify every cloud resource used by the application.
- [ ] Confirm the billing account and applicable pricing model.
- [ ] Check the selected Cloud Run region and service settings.
- [ ] Review logs and monitoring for potential ingestion costs.
- [ ] Identify external AI provider usage charges.
- [ ] Configure a budget and appropriate notifications where available.
- [ ] Review actual billing data after running the application.
- [ ] Remove unused resources when they are no longer needed.
- [ ] Verify that cleanup will not delete resources required by other projects.

Record the date and period covered by any cost review.

## 8. Backup, Recovery, and Rollback

Determine what recovery mechanisms are available for each component.

- **Application code:** identify the Git revision used for each deployment.
- **Cloud Run:** identify previous revisions and understand how rollback works.
- **Database:** verify whether backups exist and how restoration is performed.
- **Configuration:** document how configuration changes are tracked and restored.
- **Secrets:** document the approved recovery and rotation process without
  recording secret values.

A previous Cloud Run revision does not automatically restore database state
or reverse external side effects.

Do not claim a rollback or restore procedure works until it has been tested
safely.

## 9. Operational Verification Checklist

- [ ] Confirm the currently deployed application version.
- [ ] Identify the active Cloud Run service and revision.
- [ ] Find and inspect logs for a successful request.
- [ ] Find and inspect logs for a failed request, if safely reproducible.
- [ ] Verify the health-check approach for each service.
- [ ] Review timeout, memory, concurrency, and scaling settings.
- [ ] Confirm how to deploy a new revision and roll back.
- [ ] Identify database backup and recovery arrangements.
- [ ] Review current usage and billing information.
- [ ] Identify monitoring gaps and operational risks.

Only check an item after collecting evidence.

## 10. Findings and Action Items

| ID      | Finding            | Impact         | Next action      | Status |
| ------- | ------------------ | -------------- | ---------------- | ------ |
| OPS-001 | To be investigated | To be assessed | Collect evidence | Open   |

Record concrete findings instead of assumptions. Prioritize issues based on
their impact on users, reliability, security, and cost.

## 11. Lessons Learned

Update this section as operational checks are completed.

- Which failures were easiest to diagnose?
- Which logs or metrics were missing?
- Did startup time or latency affect the user experience?
- Which settings had the greatest impact on reliability or cost?
- What should be automated in future deployments?
- What would be needed before operating this application for real users?

## 12. Related Documentation

- [Deployment Overview](README.md)
- [Architecture](architecture.md)
- [Service Inventory](services.md)
- [Configuration and Secrets](configuration-and-secrets.md)
- [Security](security.md)
- [Lessons Learned](lessons-learned.md)

## 13. Document Status

**Status:** Initial draft; operational behavior and costs require verification.

**Next step:** Inspect the deployed services, collect operational evidence,
and record measured findings before recommending configuration changes.
