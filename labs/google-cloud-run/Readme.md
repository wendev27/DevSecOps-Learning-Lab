# Google Cloud Run Labs

## Overview

This directory contains hands-on labs for learning Google Cloud Run and cloud deployment practices. It focuses on deploying containerized applications, configuring cloud services, securing workloads, and operating applications in a managed cloud environment.

SmartFlood V4 serves as the primary case study for connecting cloud engineering concepts with an existing full-stack application.

The goal is to understand not only how to deploy an application, but also why specific configurations are chosen, how services communicate, how deployments are validated, and how cloud resources are managed securely and efficiently.

## Objectives

- Understand Google Cloud Run services, revisions, and deployment workflows.
- Deploy and operate containerized application services.
- Understand container startup, port configuration, and runtime requirements.
- Configure environment variables and managed secrets.
- Understand service-to-service communication.
- Review IAM permissions, service access, and network exposure.
- Inspect application logs, health checks, and deployment revisions.
- Understand resource allocation, scaling behavior, and concurrency.
- Review cloud billing, cost controls, and resource cleanup.
- Document configuration decisions, troubleshooting steps, and lessons learned.

## Lab Structure

| Lab                       | Description                                                         | Status      |
| ------------------------- | ------------------------------------------------------------------- | ----------- |
| SmartFlood V4             | Document and verify the existing application deployment.            | In Progress |
| Cloud Run Fundamentals    | Study services, revisions, regions, container startup, and scaling. | Planned     |
| Configuration and Secrets | Review runtime configuration and secret management.                 | In Progress |
| Networking and Security   | Examine service access, IAM permissions, and exposed endpoints.     | Planned     |
| Operations and Cost       | Review logs, health checks, resource usage, billing, and cleanup.   | Planned     |

## Project Case Study

### SmartFlood V4

SmartFlood V4 is an existing full-stack application used to practice cloud deployment and operations.

The current deployment documentation covers a hybrid architecture in which the frontend is hosted on Vercel and the backend API is deployed to Google Cloud Run.

The deployment status and configuration of the separate FastAPI AI service must be verified before its placement in the architecture is considered confirmed.

See [SmartFlood V4 Documentation](./smartflood-v4/README.md).

## Documentation Principles

- Document actual configurations and observed behavior rather than assumptions.
- Never commit credentials, private keys, access tokens, or secret values.
- Distinguish implemented, verified, and planned work.
- Explain why each configuration was selected and identify relevant trade-offs.
- Record validation steps and their results.
- Document troubleshooting procedures and lessons learned.
- Include cleanup procedures for resources that may incur charges.
- Keep application-specific deployment details in the corresponding project directory.

## Learning Workflow

Each lab follows this workflow:

1. Understand the underlying cloud concept.
2. Inspect the existing configuration or deployment.
3. Perform a focused hands-on exercise.
4. Validate the result.
5. Document the configuration and reasoning.
6. Record lessons learned and remaining questions.
7. Review security and potential costs.

## Learning Roadmap

Track overall progress in the main repository README under **Phase 14 — Google Cloud Run Deployment**.

This directory contains the supporting documentation and practical exercises for that phase.

## Scope

These labs focus on learning and documenting Google Cloud Run. They do not imply that every application component has been migrated to Google Cloud or that every deployment configuration has undergone a complete security review.

Deployment details and completion statuses must be verified against the actual application configuration and deployed resources.

## Status

Actively Learning

This directory evolves as existing deployments are inspected, cloud concepts are practiced, and operational knowledge is documented.
