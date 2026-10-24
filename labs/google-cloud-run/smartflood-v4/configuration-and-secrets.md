# SmartFlood V4 — Configuration and Secrets Management

## Overview

This document describes how SmartFlood V4 manages runtime configuration and sensitive information across its application services.

It covers environment variables, cloud-managed secrets, service configuration, and the separation of configuration between the frontend, Backend API, AI service, and database integrations.

The goal is to make the deployment reproducible while preventing credentials and sensitive information from being exposed.

**Important:** Configuration details must be verified against the actual repository and deployed services. Do not assume that a variable is configured or a secret is securely managed until its implementation has been inspected.

## Objectives

- Understand the difference between configuration and secrets.
- Identify the environment variables required by each service.
- Document where configuration is defined and consumed.
- Review how sensitive credentials are stored and accessed.
- Understand how configuration changes affect deployments.
- Prevent secrets from being committed to source control.
- Establish a safe process for validating configuration.

## 1. Configuration Categories

### Application Configuration

Application configuration controls how a service behaves at runtime.

Examples include:

- API base URLs.
- Database connection settings.
- Application environment identifiers.
- Service endpoints.
- Runtime feature settings.
- Logging levels.

### Secrets

Secrets are sensitive values that grant access to systems or protect confidential information.

Examples include:

- Database passwords and connection credentials.
- API keys and access tokens.
- Private keys.
- Authentication signing secrets.
- Credentials for external AI providers.

Actual secret values must never be included in this document.

## 2. Service Configuration Inventory

| Component             | Configuration Location                                 | Verification Status   |
| --------------------- | ------------------------------------------------------ | --------------------- |
| Frontend              | Vercel project configuration and application code      | Requires verification |
| Backend API           | Cloud Run service configuration and application code   | Requires verification |
| AI Service            | Deployment platform configuration and application code | Requires verification |
| Database integrations | Relevant application service configuration             | Requires verification |

Document the actual configuration source for each component after inspecting the repository and deployment settings.

## 3. Environment Variable Inventory

Record variable names and their purpose without recording sensitive values.

| Variable Name            | Used By                   | Purpose                                                                      | Sensitive?       | Status                |
| ------------------------ | ------------------------- | ---------------------------------------------------------------------------- | ---------------- | --------------------- |
| `NEXT_PUBLIC_*`          | Frontend                  | Public build-time or client-side configuration, depending on framework usage | Depends on value | Requires review       |
| Backend API URL variable | Frontend                  | Identifies the API endpoint                                                  | Usually no       | Requires verification |
| Database URL variable    | Backend or AI service     | Configures database connectivity                                             | Often yes        | Requires verification |
| AI service URL variable  | Backend API               | Identifies the AI endpoint                                                   | Usually no       | Requires verification |
| AI provider API key      | AI service, if applicable | Authenticates with an external AI provider                                   | Yes              | Requires verification |

The entries above are examples, not a confirmed inventory of SmartFlood V4's actual environment variables.

Replace generic descriptions with the real variable names found in the application code and deployment configuration.

### Frontend Configuration

Verify:

- Which variables are required during the build.
- Which variables are read at runtime.
- Which variables are exposed to browser-side code.
- Which API URL the frontend uses.
- Whether changing a variable requires a new deployment.

Never expose private credentials through client-side environment variables. In Next.js, variables prefixed with `NEXT_PUBLIC_` are generally included in browser-delivered JavaScript when referenced by the application.

### Backend API Configuration

Verify:

- Required runtime environment variables.
- Database connection configuration.
- AI service endpoint configuration, if applicable.
- Authentication and authorization settings.
- Logging and runtime options.

### AI Service Configuration

Verify:

- Required environment variables.
- Model provider configuration, if applicable.
- Database or external service connectivity.
- API credentials and their storage mechanism.
- Runtime configuration and startup requirements.

## 4. Secret Management

### Expected Practices

- Store production secrets in an appropriate managed secret store.
- Grant access only to the identities that require each secret.
- Avoid embedding credentials in Docker images.
- Avoid committing `.env` files containing real secrets.
- Never print secret values in application logs.
- Rotate credentials when exposure is suspected.
- Separate development credentials from production credentials.

For Google Cloud deployments, evaluate Google Cloud Secret Manager and the permissions required for each service to access its secrets.

Do not assume Secret Manager is already configured for SmartFlood V4 without verification.

## 5. Configuration and Secret Verification

- [ ] Identify environment variables referenced by the frontend.
- [ ] Identify environment variables referenced by the Backend API.
- [ ] Identify environment variables referenced by the AI service.
- [ ] Compare application requirements with deployed configuration.
- [ ] Identify which values are public configuration and which are secrets.
- [ ] Verify how production credentials are stored.
- [ ] Review permissions for accessing managed secrets.
- [ ] Confirm that secrets are not committed to Git.
- [ ] Confirm that logs do not expose credentials.
- [ ] Document how configuration changes are deployed and validated.

## 6. Safe Validation Procedure

1. Inspect environment variable names in the source code and example environment files.
2. Review deployment configuration without copying secret values.
3. Compare required variables against the deployed service configuration.
4. Confirm that each service can access the resources it needs.
5. Validate application health and relevant functionality.
6. Review logs for configuration errors without exposing sensitive data.
7. Document discrepancies and corrective actions.

Do not paste production credentials into terminal output, documentation, screenshots, or chat messages.

## 7. Configuration Changes and Deployment

Document the process for changing configuration:

1. Identify the affected service and variable.
2. Determine whether the change requires a rebuild, redeployment, or service restart.
3. Update the appropriate configuration source.
4. Verify access permissions for any affected secrets.
5. Deploy the change using the established workflow.
6. Validate service health and application behavior.
7. Record the change and its result.

The exact deployment behavior depends on the hosting platform and the type of configuration being changed.

## 8. Findings and Improvements

Record confirmed findings in the following format:

| Finding          | Evidence         | Risk or Impact | Recommended Action | Status |
| ---------------- | ---------------- | -------------- | ------------------ | ------ |
| To be documented | To be documented | To be assessed | To be determined   | Open   |

Only record findings supported by evidence from the repository or deployed configuration.

## Related Documentation

- [Project Overview](./README.md)
- [Deployment Architecture](./architecture.md)
- [Service Configurations](./services.md)
- [Security Review](./security.md)
- [Operations and Costs](./operations-and-costs.md)
- [Lessons Learned](./lessons-learned.md)

## Status

**Status:** Initial draft; configuration sources and secret-management practices require verification.
