# SmartFlood V4 — Cloud Run Security

## 1. Overview

This document records the security controls, trust boundaries, risks, and
verification steps relevant to the SmartFlood V4 deployment.

The goal is to understand how the application is protected when its frontend,
backend API, AI service, and supporting infrastructure communicate.

**Documentation rule:** distinguish between controls that are implemented,
controls that have been verified, and improvements that are only planned.

> This document is a working assessment. A control must not be marked as
> implemented or verified until supporting evidence has been collected.

## 2. Security Objectives

- Protect credentials, API keys, and other sensitive configuration.
- Restrict access to backend services where appropriate.
- Understand communication between the frontend, backend API, and AI service.
- Apply least-privilege access to Google Cloud resources.
- Avoid exposing internal services unnecessarily.
- Reduce the risk of unauthorized access, data leakage, and service abuse.
- Establish a repeatable process for reviewing security after deployment changes.

## 3. Deployment Components and Trust Boundaries

| Component            | Hosting                                                      | Security considerations                                          |
| -------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------- |
| Frontend             | Vercel (reported deployment; verify current state)           | Public access, browser-visible configuration, HTTPS              |
| Backend API          | Google Cloud Run (reported deployment; verify current state) | Authentication, ingress, IAM, input validation, service identity |
| AI service           | FastAPI service; hosting and status to verify                | Access restrictions, model/API credentials, request validation   |
| Database             | To be verified                                               | Network access, credentials, authorization, backups              |
| External AI provider | To be verified                                               | API key protection, data handling, usage limits                  |

### Trust boundaries

Review the following communication paths:

1. User's browser to the frontend.
2. Frontend to the backend API.
3. Backend API to the AI service, if applicable.
4. Backend API to the database.
5. Application services to external providers.

For each path, identify whether communication is public or private,
how the caller is authenticated, and what data is transmitted.

Do not assume that a service is private merely because it runs on Cloud Run.

## 4. Security Control Inventory

Use the following status values:

- `Verified`: implementation and supporting evidence have been checked.
- `Implemented - unverified`: configured or believed to be implemented, but evidence is incomplete.
- `Not implemented`: checked and confirmed absent.
- `Needs investigation`: current state is unknown.
- `Planned`: proposed improvement, not yet implemented.

| Control                                      | Status              | Evidence or notes                                               |
| -------------------------------------------- | ------------------- | --------------------------------------------------------------- |
| HTTPS for public endpoints                   | Needs investigation | Record the deployed URLs and verify HTTPS                       |
| Secrets excluded from Git                    | Needs investigation | Review tracked files and repository history where appropriate   |
| Sensitive values stored securely             | Needs investigation | Inspect the actual configuration and secret-management approach |
| Cloud Run service access restrictions        | Needs investigation | Inspect authentication and ingress settings                     |
| Least-privilege IAM                          | Needs investigation | Review service identities and assigned roles                    |
| Backend API authentication and authorization | Needs investigation | Inspect API routes and middleware                               |
| AI service access restrictions               | Needs investigation | Verify how the backend reaches the AI service                   |
| Input validation                             | Needs investigation | Inspect request schemas and validation logic                    |
| CORS policy                                  | Needs investigation | Review allowed origins and methods                              |
| Error responses avoid leaking secrets        | Needs investigation | Review application error handling and logs                      |
| Dependency security                          | Needs investigation | Review dependency scanning and update practices                 |
| Logging avoids sensitive data                | Needs investigation | Inspect log statements and Cloud Logging output                 |
| Resource limits and abuse protection         | Needs investigation | Review quotas, timeouts, concurrency, and rate limiting         |

Update a status only after reviewing the relevant configuration or collecting
evidence.

## 5. Identity and Access Management

Google Cloud IAM determines which users, services, and workloads can access
Google Cloud resources.

Review the following:

- Which Google account or principal deploys the Cloud Run services?
- Which service account does each Cloud Run service use?
- Are default service accounts being used unnecessarily?
- Do service accounts have only the permissions required by the application?
- Who can deploy new revisions or change service configuration?
- Does the AI service require authenticated service-to-service requests?
- Are public invoker permissions intentionally configured?

### Evidence to collect

Record the relevant service names, service accounts, IAM bindings, and the
reason each permission is needed.

Never include access tokens, private keys, or other secret values in this file.

## 6. Secrets and Sensitive Configuration

Potentially sensitive values include:

- Database credentials and connection strings.
- External AI provider API keys.
- Authentication secrets and signing keys.
- Private service credentials.
- Any token used to call a protected service.

Security practices:

- Never commit real secret values to Git.
- Do not place secrets in frontend environment variables that are exposed to
  the browser.
- Use an appropriate secret-management mechanism, such as Google Cloud Secret
  Manager, where applicable.
- Grant secret access only to the identities that need it.
- Rotate credentials if exposure is suspected.
- Redact secrets from logs, screenshots, and documentation.

See [Configuration and Secrets](configuration-and-secrets.md) for the
configuration inventory and related verification steps.

## 7. Public Access and Service-to-Service Communication

For each Cloud Run service, document:

| Question                              | Finding             |
| ------------------------------------- | ------------------- |
| Is the service publicly reachable?    | Needs investigation |
| Is authentication required?           | Needs investigation |
| Is ingress restricted?                | Needs investigation |
| Which clients are allowed to call it? | Needs investigation |
| How does the caller authenticate?     | Needs investigation |
| Is sensitive data transmitted?        | Needs investigation |

A public frontend does not automatically require every backend or AI service
to be publicly accessible.

Where supported by the architecture, prefer restricting internal services and
allowing only authorized callers. Verify the actual requirements before
changing access settings; an incorrect change can break production traffic.

## 8. Application Security

Review the backend API and AI service for:

- Request validation and safe handling of malformed input.
- Authentication and authorization for protected operations.
- CORS configuration appropriate to the deployed frontend.
- Safe error handling without stack traces or credentials in client responses.
- Protection against abuse through quotas, rate limits, and request-size limits.
- Safe handling of uploaded files and user-provided content, if applicable.
- Dependency updates and known vulnerability checks.
- Appropriate timeouts for calls to databases and external services.

Record findings with references to the relevant source files or configuration.
Do not claim a vulnerability exists until the behavior has been investigated.

## 9. Logging and Monitoring

Review application logs and Cloud Logging for:

- Accidental logging of API keys, tokens, or passwords.
- Sensitive personal or application data.
- Repeated authentication failures or suspicious request patterns.
- Unexpected service errors and elevated error rates.
- Unusual traffic or resource consumption.

Record what is currently configured and which alerts, if any, have been tested.

Logs should support troubleshooting without unnecessarily exposing sensitive
information.

## 10. Security Verification Checklist

Complete each item only after performing the check.

- [ ] Confirm the deployed services and their current URLs.
- [ ] Verify HTTPS for public endpoints.
- [ ] Inspect repository files for accidentally committed secrets.
- [ ] Review frontend environment variables for browser-visible secrets.
- [ ] Inspect Cloud Run authentication and ingress settings.
- [ ] Review service accounts and IAM permissions.
- [ ] Determine whether the AI service is publicly reachable.
- [ ] Verify how backend-to-AI-service requests are authenticated.
- [ ] Review backend authentication and authorization.
- [ ] Review CORS and request validation.
- [ ] Inspect error responses and logs for sensitive information.
- [ ] Review dependency security practices.
- [ ] Document identified gaps and prioritize remediation.
- [ ] Re-test application behavior after security-related changes.

## 11. Findings and Remediation

Record findings using this template:

| ID      | Finding            | Risk           | Evidence     | Remediation               | Status |
| ------- | ------------------ | -------------- | ------------ | ------------------------- | ------ |
| SEC-001 | To be investigated | To be assessed | Add evidence | Define an appropriate fix | Open   |

Prioritize findings based on their impact and likelihood rather than treating
every configuration difference as a vulnerability.

Do not include secrets or sensitive personal data in the evidence column.

## 12. Lessons Learned

Update this section as the security review progresses.

- Which service boundaries were unclear before the review?
- Which resources require public access, and why?
- Which permissions can be reduced?
- Which checks should be automated in a future CI/CD pipeline?
- Which risks remain unresolved?

## 13. Related Documentation

- [SmartFlood V4 Deployment Overview](README.md)
- [Deployment Architecture](architecture.md)
- [Service Inventory](services.md)
- [Configuration and Secrets](configuration-and-secrets.md)
- [Operations and Costs](operations-and-costs.md)
- [Lessons Learned](lessons-learned.md)

## 14. Document Status

**Status:** Initial draft; security controls require verification.

**Next step:** Inspect the actual deployment configuration, gather evidence,
and replace investigation placeholders with accurate findings.
