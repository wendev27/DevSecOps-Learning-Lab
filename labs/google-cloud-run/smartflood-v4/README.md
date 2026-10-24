# SmartFlood V4 — Cloud Deployment

## Overview

This directory documents the deployment architecture, configuration, security, operations, and lessons learned from deploying SmartFlood V4 to Google Cloud Run and other cloud platforms.

SmartFlood V4 serves as a practical case study for learning cloud engineering, containerized application deployment, service configuration, cloud security, observability, and cost management.

The documentation focuses on understanding the existing deployment, recording verified configurations, and identifying areas for improvement.

## Deployment Architecture

SmartFlood V4 uses a hybrid cloud deployment architecture.

| Component            | Platform         | Status                                         |
| -------------------- | ---------------- | ---------------------------------------------- |
| Frontend             | Vercel           | Previously deployed; verify current status     |
| Backend API          | Google Cloud Run | Previously deployed; verify current status     |
| AI Service (FastAPI) | To be verified   | Deployment status not yet confirmed            |
| Database             | To be verified   | Provider and connectivity require confirmation |

The table represents the currently documented deployment understanding. Verify the live resources and configuration before treating these details as the definitive architecture.

## Objectives

- Document the existing SmartFlood V4 deployment.
- Understand the responsibilities of each application service.
- Trace requests between the frontend, backend API, AI service, and database.
- Record environment variable names and secret management practices.
- Review service authentication, IAM permissions, and network exposure.
- Inspect deployment logs, health checks, revisions, and resource limits.
- Understand cloud billing, resource usage, and cleanup procedures.
- Identify improvements for a more secure and maintainable deployment.

## Documentation

| Document                                                    | Purpose                                                           |
| ----------------------------------------------------------- | ----------------------------------------------------------------- |
| [Architecture](./architecture.md)                           | Deployment topology, service relationships, and request flow      |
| [Services](./services.md)                                   | Backend API and AI service configurations                         |
| [Configuration and Secrets](./configuration-and-secrets.md) | Environment variables, runtime configuration, and secret handling |
| [Security](./security.md)                                   | IAM, access controls, permissions, and security findings          |
| [Operations and Costs](./operations-and-costs.md)           | Logs, health checks, revisions, scaling, billing, and cleanup     |
| [Lessons Learned](./lessons-learned.md)                     | Problems encountered, solutions, trade-offs, and reflections      |

## Verification Principles

- Distinguish verified configurations from assumptions.
- Record the date and method used to verify deployment details.
- Never commit credentials, private keys, access tokens, or secret values.
- Document environment variable names without exposing their values.
- Do not mark a service as deployed or operational without evidence.
- Record configuration changes and their reasons.
- Include validation and cleanup procedures where applicable.

## Scope

This documentation covers the existing SmartFlood V4 deployment and its operational characteristics.

It does not assume that the V4 architecture, service configurations, or deployment procedures are identical to SmartFlood V5.

## Related Learning Materials

- [Google Cloud Run Labs](../README.md)
- Main repository roadmap: Phase 14 — Google Cloud Run Deployment

## Current Status

**Status:** Documentation and deployment verification in progress.

The next steps are to verify the deployed services, establish the actual request flow, document the runtime configuration, and review security and operational considerations.
