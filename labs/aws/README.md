# ☁️ AWS Engineering Lab

> **Understand. Build. Secure. Validate. Document.**
>
> A hands-on learning environment for exploring Amazon Web Services (AWS), cloud infrastructure, containerized applications, and secure deployment practices.

---

## 📖 Overview

The AWS Engineering Lab is part of my DevSecOps Learning Lab. It documents my progression from understanding cloud fundamentals to deploying and operating real applications on AWS.

Rather than studying cloud services in isolation, I use practical engineering projects to understand how AWS components work together, why particular architectures are chosen, and how to deploy applications securely and cost-effectively.

My primary practical project is **SmartFlood V5 AWS Migration**, where I am learning to prepare an existing full-stack application for deployment using Docker, Amazon ECR, Amazon ECS with Fargate, Terraform, and GitHub Actions.

This repository serves as my learning journal, implementation record, troubleshooting reference, and evidence of practical cloud engineering experience.

---

## 🎯 Learning Objectives

- Understand AWS core services and cloud architecture.
- Learn IAM, least privilege, and secure access management.
- Understand regions, Availability Zones, VPCs, subnets, and security groups.
- Containerize applications using Docker.
- Build, store, and manage container images with Amazon ECR.
- Deploy containerized applications using Amazon ECS and AWS Fargate.
- Manage infrastructure using Terraform.
- Build secure CI/CD pipelines using GitHub Actions and AWS OIDC.
- Apply DevSecOps practices, including vulnerability scanning and static analysis.
- Understand cloud costs, monitoring, logging, and operational troubleshooting.
- Document engineering decisions and validate implementations.

---

## 🗺️ Learning Roadmap

### Phase 1 — AWS Account and Cost Awareness

- [ ] Understand the AWS account structure.
- [ ] Review available Free Tier benefits and promotional credits.
- [ ] Configure billing alerts and budget monitoring.
- [ ] Understand regional resource costs.

### Phase 2 — Identity and Access Management

- [ ] Understand IAM users, roles, and policies.
- [ ] Apply least-privilege permissions.
- [ ] Understand temporary credentials and workload identity.
- [ ] Review AWS account security practices.

### Phase 3 — Networking Fundamentals

- [ ] Understand regions and Availability Zones.
- [ ] Learn VPCs, public and private subnets, and route tables.
- [ ] Understand Internet Gateways, NAT Gateways, and security groups.
- [ ] Trace application traffic through a cloud architecture.

### Phase 4 — Containerization

- [ ] Build production-oriented Dockerfiles.
- [ ] Understand build contexts, layers, and multi-stage builds.
- [ ] Configure non-root container execution.
- [ ] Exclude secrets and unnecessary files from image builds.
- [ ] Build and validate the SmartFlood service images.

### Phase 5 — Container Infrastructure

- [ ] Understand Amazon ECR.
- [ ] Understand ECS clusters, task definitions, and services.
- [ ] Learn AWS Fargate task execution.
- [ ] Configure service networking and health checks.
- [ ] Understand Application Load Balancers and service discovery.

### Phase 6 — Infrastructure as Code

- [ ] Learn Terraform configuration and providers.
- [ ] Understand resources, variables, outputs, and modules.
- [ ] Review Terraform plans before applying changes.
- [ ] Understand state management and state security.
- [ ] Provision a staging environment.

### Phase 7 — Secure CI/CD

- [ ] Implement GitHub Actions validation workflows.
- [ ] Scan source code and dependencies.
- [ ] Scan container images using Trivy.
- [ ] Explore CodeQL for supported source-code security analysis.
- [ ] Configure GitHub OIDC federation with AWS.
- [ ] Restrict deployment permissions and protect environments.

### Phase 8 — Deployment and Operations

- [ ] Deploy SmartFlood to a staging environment.
- [ ] Validate authentication and service-to-service communication.
- [ ] Inspect application and infrastructure logs.
- [ ] Test deployment failure handling and rollback.
- [ ] Review security posture and cloud costs.
- [ ] Document cleanup and resource-retention decisions.

> A checkpoint is completed only after implementation and validation evidence have been recorded.

---

## 📂 Repository Structure

```text
aws/
├── README.md
├── concepts/
│   ├── README.md
│   └── ...
├── practice/
│   ├── README.md
│   ├── 01-account-setup-and-cost-safeguards/
│   ├── 02-smartflood-containerization/
│   ├── 03-local-integration-testing/
│   ├── 04-terraform-staging/
│   ├── 05-secure-ci-cd/
│   └── 06-staging-deployment/
└── review/
    ├── README.md
    ├── questions.md
    ├── troubleshooting.md
    └── lessons-learned.md
```

The structure will evolve as new labs are implemented. Planned directories and checkpoints are not considered completed work.

---

## 📚 How to Use This Lab

### Concepts

Study the purpose, architecture, behavior, trade-offs, security implications, and cost considerations of individual AWS services.

### Practice

Follow hands-on labs that document commands, configuration files, implementation steps, test results, and troubleshooting.

### Review

Revisit lessons, answer technical questions from memory, explain architecture decisions, and practice describing implementations in an interview.

---

## 🧪 Engineering Workflow

Every significant lab follows this process:

1. Identify the engineering problem.
2. Research the relevant concepts.
3. Design the solution and evaluate alternatives.
4. Implement the configuration.
5. Validate the result.
6. Review security and cost implications.
7. Document failures, fixes, and lessons learned.
8. Record cleanup or operational follow-up.

---

## 🛡️ DevSecOps Principles

- Apply least privilege to users, workloads, and deployment roles.
- Keep credentials and sensitive configuration out of source control.
- Prefer temporary credentials and workload identity over long-lived access keys.
- Scan dependencies, source code, and container images where appropriate.
- Use immutable image versions and review deployment changes.
- Review Terraform plans before provisioning infrastructure.
- Monitor resource usage and configure cost safeguards.
- Keep a documented recovery and rollback strategy.

Security tools are introduced as part of the workflow; their presence alone does not establish that an application is secure.

---

## 📝 Documentation Standard

Every practice lab should record:

- Objective and prerequisites.
- Architecture and request flow.
- Implementation steps and important commands.
- Code walkthroughs explaining what each configuration does and why it was chosen.
- Validation evidence and test results.
- Security and cost considerations.
- Troubleshooting notes.
- Lessons learned and follow-up tasks.
- Cleanup instructions.

Never commit AWS credentials, private keys, session secrets, service-role keys, or real environment files.

---

## 🌊 Primary Application Project

**SmartFlood V5 AWS Migration**

- [AWS migration repository](https://github.com/wendev27/Smart-Flood-V5-AWS)
- [Original SmartFlood V4.1 source branch](https://github.com/wendev27/SmartFlood-V4.1/tree/fe-be-merge)

This project provides a practical environment for applying cloud architecture, containerization, infrastructure automation, deployment security, and operational validation.

---

## 🚧 Current Status

**In progress — AWS fundamentals and SmartFlood containerization.**

The immediate objective is to prepare the frontend, API, and AI services for reproducible local container builds before provisioning AWS infrastructure.

Only verified implementation and test results will be recorded as completed.

---

## 💭 Engineering Philosophy

> Don't just learn which command works. Understand why it works, what it changes, what can fail, and how to prove the result is correct.

The goal is to develop practical cloud engineering judgment through deliberate implementation, review, and continuous improvement.
