# SmartFlood V4 — Service Configurations

## Overview

This document describes the application services used by SmartFlood V4, their responsibilities, runtime configurations, deployment platforms, and communication paths.

Service details must be verified against the repository and deployed resources. Unknown or unverified values must remain explicitly marked as such.

## Service Inventory

| Service     | Technology     | Hosting Platform                         | Status                |
| ----------- | -------------- | ---------------------------------------- | --------------------- |
| Backend API | To be verified | Google Cloud Run (previously documented) | Requires verification |
| AI Service  | FastAPI        | To be verified                           | Requires verification |

## 1. Backend API

### Purpose

The Backend API handles application requests and coordinates communication with supporting services and data stores, where applicable.

### Configuration

| Property         | Value                                       |
| ---------------- | ------------------------------------------- |
| Service name     | To be verified                              |
| Hosting platform | Google Cloud Run; verify current deployment |
| Region           | To be verified                              |
| Container image  | To be verified                              |
| Listening port   | To be verified                              |
| Health endpoint  | To be verified                              |
| Public access    | To be verified                              |
| Runtime identity | To be verified                              |

### Responsibilities

Document the API's confirmed responsibilities, including:

- Application endpoints and request handling.
- Authentication and authorization.
- Database access.
- Communication with the AI service, if applicable.
- Error handling and health reporting.

### Verification Checklist

- [ ] Confirm the deployed Cloud Run service and region.
- [ ] Identify the container image and runtime port.
- [ ] Identify available health-check endpoints.
- [ ] Review environment variable names and secret references.
- [ ] Confirm database connectivity.
- [ ] Confirm whether the API invokes the AI service.
- [ ] Verify ingress settings and invocation permissions.

## 2. AI Service — FastAPI

### Purpose

The AI service provides AI-related functionality through a FastAPI application. Its exact responsibilities and integration with the Backend API must be verified.

### Configuration

| Property               | Value                           |
| ---------------------- | ------------------------------- |
| Service name           | To be verified                  |
| Framework              | FastAPI                         |
| Hosting platform       | To be verified                  |
| Region                 | To be verified, if cloud-hosted |
| Container image        | To be verified                  |
| Listening port         | To be verified                  |
| Health endpoint        | To be verified                  |
| Invocation permissions | To be verified                  |

### Responsibilities

Document the confirmed AI service functionality, including:

- Available API endpoints.
- Model or external AI provider integrations, if applicable.
- Request and response formats.
- Dependencies and runtime requirements.
- Error handling and service health.

### Verification Checklist

- [ ] Locate the FastAPI application entry point.
- [ ] Identify its Dockerfile and dependency definitions.
- [ ] Confirm the listening port and startup command.
- [ ] Determine where the service is currently deployed.
- [ ] Identify the service URL or internal endpoint.
- [ ] Confirm how the Backend API communicates with it.
- [ ] Review authentication, secrets, and external dependencies.
- [ ] Validate health endpoints and application logs.

## 3. Service-to-Service Communication

Document the actual communication paths after verification.

| Source      | Destination | Purpose                            | Verification Status   |
| ----------- | ----------- | ---------------------------------- | --------------------- |
| Frontend    | Backend API | Application API requests           | Requires verification |
| Backend API | AI Service  | AI-related requests, if applicable | Requires verification |
| Backend API | Database    | Data access, if applicable         | Requires verification |

For each confirmed connection, record:

- Protocol and endpoint type.
- Authentication mechanism.
- Relevant configuration variable names.
- Network and access requirements.
- Expected behavior when the destination is unavailable.

Never include secret values or credentials.

## 4. Operational Considerations

For each deployed service, document:

- Startup and deployment procedure.
- Health checks and logs.
- CPU and memory allocation.
- Scaling and concurrency settings.
- Timeout and request-size limits.
- Failure handling and recovery.
- Relevant costs and cleanup procedures.

## 5. Related Documentation

- [Project Overview](./README.md)
- [Deployment Architecture](./architecture.md)
- [Configuration and Secrets](./configuration-and-secrets.md)
- [Security Review](./security.md)
- [Operations and Costs](./operations-and-costs.md)
- [Lessons Learned](./lessons-learned.md)

## Status

**Status:** Initial draft; service configurations and deployment details require verification.
