# 🧪 AWS Practice Labs

> **Learn by building. Validate by testing. Improve through review.**

## 📖 Overview

This directory contains hands-on labs for learning AWS through practical engineering work.

Each lab documents the problem being solved, the implementation process, the commands and configuration files involved, validation evidence, security and cost considerations, and lessons learned.

The primary application used throughout these exercises is SmartFlood V5 AWS Migration.

These labs are part of the [AWS Engineering Lab](../README.md) within the DevSecOps Learning Lab.

---

## 🗺️ Practice Roadmap

| #   | Practice Lab                          | Main Topics                                        | Status      |
| --- | ------------------------------------- | -------------------------------------------------- | ----------- |
| 01  | AWS Account Setup and Cost Safeguards | Account security, credits, billing alerts, budgets | Pending     |
| 02  | SmartFlood Containerization           | Dockerfiles, image configuration, `.dockerignore`  | In progress |
| 03  | Local Integration Testing             | Image builds, container networking, health checks  | Planned     |
| 04  | Terraform Staging Infrastructure      | VPC, IAM, ECR, ECS/Fargate, load balancing         | Planned     |
| 05  | Secure CI/CD Pipeline                 | GitHub Actions, Trivy, CodeQL, OIDC                | Planned     |
| 06  | Approved Staging Deployment           | Deployment, smoke tests, monitoring, rollback      | Planned     |

> Status reflects actual implementation and validation, not merely the existence of a directory.

---

## 🌊 Primary Project — SmartFlood V5 AWS Migration

**Application repository:** [SmartFlood V5 AWS Migration](https://github.com/wendev27/Smart-Flood-V5-AWS)

**Original application source:** [SmartFlood V4.1 — fe-be-merge](https://github.com/wendev27/SmartFlood-V4.1/tree/fe-be-merge)

### Application components

- **Frontend:** Next.js and React.
- **API:** Next.js route handlers.
- **AI service:** FastAPI with Gunicorn and Uvicorn.
- **External dependencies:** MongoDB Atlas and Supabase.

### Target architecture

```text
Internet
   |
HTTPS Application Load Balancer
   |
Frontend ECS Service
   |
   +--> Internal API ECS Service
                |
                +--> Internal AI ECS Service
                |
                +--> MongoDB Atlas
                +--> Supabase
```

The target architecture is a design proposal until it has been implemented and validated. Only the frontend should be publicly reachable; API and AI access should be restricted to the required service-to-service paths.

### Project workflow

1. Prepare Dockerfiles and image configurations.
2. Build and test images locally.
3. Validate service communication and health checks.
4. Design and review staging infrastructure with Terraform.
5. Implement secure image publishing and deployment workflows.
6. Deploy to staging after explicit review and approval.
7. Validate application behavior, security, monitoring, and rollback.

---

## 📂 Lab Documentation Structure

Each lab should have its own directory and README.

```text
practice/
├── README.md
├── 01-account-setup-and-cost-safeguards/
│   └── README.md
├── 02-smartflood-containerization/
│   └── README.md
├── 03-local-integration-testing/
│   └── README.md
├── 04-terraform-staging/
│   └── README.md
├── 05-secure-ci-cd/
│   └── README.md
└── 06-staging-deployment/
    └── README.md
```

Additional files should be introduced when they add value, such as architecture diagrams, test reports, sanitized command output, and troubleshooting notes.

---

## 📝 Required Practice Record

Every lab should document the following.

### 1. Objective

What problem are we solving, and what should be learned?

### 2. Prerequisites

Which tools, permissions, dependencies, and earlier concepts are required?

### 3. Architecture

What components are involved, how do they communicate, and why was this design chosen?

### 4. Implementation

Record the actual commands, changed files, configuration values that are safe to share, and implementation sequence.

### 5. Code Walkthrough

Explain important instructions and configuration choices:

- What does this instruction do?
- Why is this approach appropriate?
- What alternatives were considered?
- What would happen if the configuration were changed?

### 6. Validation

Record commands, test results, health-check results, and sanitized evidence. Clearly distinguish passed, failed, skipped, and not-yet-run tests.

### 7. Security Review

Document access restrictions, secret handling, vulnerability scans, image configuration, and remaining risks.

### 8. Cost Review

Identify resources that can incur charges, expected cost drivers, safeguards, and resource cleanup requirements.

### 9. Troubleshooting

Record the symptoms, investigation, root cause, fix, and how the fix was verified.

### 10. Lessons Learned

Summarize what was learned and include questions that can be answered without consulting the implementation.

### 11. Cleanup

Explain which resources can be removed safely, which must be retained, and how cleanup is verified.

---

## 🔐 Safety Rules

- Never commit AWS access keys, private keys, passwords, session secrets, or service-role keys.
- Never commit real `.env` files or unredacted secret output.
- Review IAM permissions before granting deployment access.
- Review Terraform plans before applying infrastructure changes.
- Confirm the AWS account and region before provisioning resources.
- Monitor billing and recurring services such as load balancers and NAT Gateways.
- Do not delete shared or production resources without confirming ownership and impact.
- Record any resources intentionally retained after a lab.

---

## 🚦 Completion Criteria

A lab can be marked complete only when:

- The objective has been implemented.
- Required tests and validation have been executed.
- Results and known limitations have been documented.
- Security and cost implications have been reviewed.
- Troubleshooting and lessons learned have been recorded.
- Cleanup has been completed or remaining resources have been explicitly documented.

---

## 🚧 Current Focus

**Practice 02 — SmartFlood Containerization**

The immediate focus is to create and understand the Dockerfiles and image configurations for the frontend, API, and AI service.

Each Dockerfile will contain explanatory comments about the implementation and the reasons behind important design decisions. Local image builds and integration tests will follow before any AWS infrastructure is provisioned.

See the [SmartFlood V5 AWS Migration repository](https://github.com/wendev27/Smart-Flood-V5-AWS) for the application and infrastructure implementation.
