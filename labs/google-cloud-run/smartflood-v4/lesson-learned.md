# SmartFlood V4 — Lessons Learned

## 1. Overview

This document records the technical lessons, deployment decisions, challenges,
and improvement opportunities identified while deploying SmartFlood V4.

The purpose is to turn practical experience into reusable knowledge for future
cloud deployments, DevOps workflows, and DevSecOps practices.

This document should reflect actual experience and collected evidence.
Do not present an assumption, planned improvement, or unverified issue as a
confirmed result.

## 2. Project Context

SmartFlood V4 is an existing application used as a practical case study for
learning cloud deployment and operations.

The deployment involves investigating the responsibilities and interactions
of the frontend, backend API, AI service, database, and supporting cloud
resources.

| Item                         | Details                                                                 |
| ---------------------------- | ----------------------------------------------------------------------- |
| Application                  | SmartFlood V4                                                           |
| Deployment platform          | Google Cloud Run for the backend API, as reported; verify current state |
| Frontend hosting             | Vercel, as reported; verify current state                               |
| AI service hosting           | To be verified                                                          |
| Database                     | To be verified                                                          |
| Repository revision deployed | To be recorded                                                          |
| Review date                  | To be recorded                                                          |

## 3. Technical Knowledge Gained

Update these sections as each concept is investigated and verified.

### 3.1 Cloud Deployment

- Learned how application components map to deployment services.
- Investigated the difference between application code and cloud infrastructure.
- Practiced documenting deployment architecture and service responsibilities.
- Identified the need to verify the deployed revision and configuration.

**Evidence or example:** Add a real deployment command, configuration reference,
or observed behavior.

### 3.2 Service Architecture

- Investigated how the frontend communicates with the backend API.
- Identified the dependencies between application services.
- Learned why service URLs, access controls, and runtime configuration matter.
- Documented trust boundaries and areas requiring further verification.

**Evidence or example:** Reference the verified architecture in `architecture.md`.

### 3.3 Configuration and Secrets

- Learned to distinguish public configuration from sensitive values.
- Identified why credentials must not be committed to source control.
- Practiced documenting environment-variable purposes without exposing values.
- Investigated the appropriate location for secrets and runtime configuration.

**Evidence or example:** Reference `configuration-and-secrets.md` and record
the checks actually completed.

### 3.4 Security

- Investigated service access, identity, and least-privilege permissions.
- Identified security controls that need evidence before they can be considered
  verified.
- Learned that a successfully deployed service is not automatically secure.
- Documented risks and potential remediation steps.

**Evidence or example:** Reference `security.md` and describe a verified finding.

### 3.5 Operations and Reliability

- Investigated logging and troubleshooting workflows.
- Identified the importance of timeouts, resource limits, and scaling settings.
- Reviewed recovery and rollback considerations.
- Investigated cloud usage and cost visibility.

**Evidence or example:** Reference `operations-and-costs.md` and add actual
observations where available.

## 4. Challenges Encountered

Record real challenges encountered during deployment or investigation.

| Challenge        | Root cause         | Resolution       | Prevention       |
| ---------------- | ------------------ | ---------------- | ---------------- |
| To be documented | To be investigated | To be documented | To be documented |

For each challenge, explain:

1. What happened?
2. How was it detected?
3. What caused it?
4. How was it resolved?
5. What evidence confirms the resolution?
6. How could the same problem be prevented?

If no issue has been encountered yet, leave the table as a template rather
than inventing a failure.

## 5. Important Engineering Decisions

Record decisions that affected the deployment.

| Decision         | Reason           | Trade-off        | Revisit when     |
| ---------------- | ---------------- | ---------------- | ---------------- |
| To be documented | To be documented | To be documented | To be documented |

Examples of decisions worth documenting include:

- Choosing a hosting platform for a particular service.
- Separating the frontend from the backend API.
- Deciding whether a service should be publicly accessible.
- Choosing how to provide runtime configuration and secrets.
- Selecting resource limits or scaling settings.
- Deciding how deployment changes should be reviewed and tracked.

Only include decisions that were actually made or evaluated.

## 6. What Went Well

Record practices that helped the deployment or investigation.

Potential topics:

- Existing project documentation made dependencies easier to understand.
- Breaking the deployment into separate services clarified responsibilities.
- Version control helped track infrastructure and documentation changes.
- A repeatable verification checklist reduced guesswork.

Keep only the observations that match your actual experience.

## 7. What Could Be Improved

Record gaps and practical improvements for future work.

Potential areas to investigate:

- Automating deployment through a CI/CD pipeline.
- Adding automated tests before deployment.
- Adding dependency and container image security checks.
- Improving monitoring and alerting.
- Reviewing IAM permissions and service access.
- Documenting rollback and recovery procedures.
- Establishing a repeatable cost-review process.
- Automating safe configuration validation.

Distinguish between improvements already completed and those still planned.

## 8. DevSecOps Opportunities

This deployment can support further practice in:

- **Source control:** reviewable changes, branches, and pull requests.
- **CI/CD:** automated testing and controlled deployments.
- **Infrastructure as Code:** reproducible cloud resources.
- **Application security:** dependency scanning, input validation, and access control.
- **Cloud security:** IAM review, secret management, and service boundaries.
- **Observability:** logs, metrics, alerts, and troubleshooting.
- **Cost management:** budgets, usage review, and resource cleanup.

These are learning opportunities, not claims that the corresponding controls
are already implemented.

## 9. Reusable Lessons for Future Projects

Before deploying another application:

1. Inventory all application components and dependencies.
2. Verify how each component is built, configured, and started.
3. Document the intended deployment architecture.
4. Identify public endpoints and service-to-service communication.
5. Plan configuration and secret management before deployment.
6. Review IAM permissions and access requirements.
7. Define a deployment verification checklist.
8. Inspect logs and test important application flows.
9. Review reliability, rollback, and cost considerations.
10. Record the deployed revision and evidence of successful verification.

## 10. Future Action Items

| Priority | Action                                          | Reason                                     | Status  |
| -------- | ----------------------------------------------- | ------------------------------------------ | ------- |
| High     | Verify the complete deployed architecture       | Establish an accurate system inventory     | Open    |
| High     | Review secrets, service access, and IAM         | Reduce uncertainty about security controls | Open    |
| Medium   | Document a repeatable deployment procedure      | Improve reproducibility                    | Open    |
| Medium   | Review logs, monitoring, and rollback           | Improve operational readiness              | Open    |
| Medium   | Investigate CI/CD and automated security checks | Build a repeatable DevSecOps workflow      | Planned |

Adjust priorities and statuses based on the actual findings.

## 11. Personal Reflection

Answer these questions after completing the case study.

- What did I understand better after deploying the application?
- Which concept was the most difficult to understand?
- Which deployment assumption did I have to verify or correct?
- What can I now explain confidently to another developer?
- What still needs hands-on practice?
- What would I do differently if I deployed the application again?
- Which skill should I practice next?

## 12. Related Documentation

- [Deployment Overview](README.md)
- [Architecture](architecture.md)
- [Service Inventory](services.md)
- [Configuration and Secrets](configuration-and-secrets.md)
- [Security](security.md)
- [Operations and Costs](operations-and-costs.md)

## 13. Document Status

**Status:** Initial draft; update with actual experiences and verified findings.

**Completion criteria:**

- [ ] Record the actual deployed architecture.
- [ ] Document at least one real technical observation.
- [ ] Record any genuine challenges and their resolutions.
- [ ] Explain important decisions and trade-offs.
- [ ] Identify remaining risks and improvements.
- [ ] Add evidence or references where appropriate.
- [ ] Complete the personal reflection.
