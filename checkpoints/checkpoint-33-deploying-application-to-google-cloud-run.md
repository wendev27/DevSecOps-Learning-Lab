# Checkpoint 33 — Deploying a Containerized Application to Google Cloud Run

> **Phase:** 8 — Cloud & Kubernetes
> **Focus:** Cloud Deployment / Containers / Serverless Infrastructure
> **Platform:** Google Cloud Platform
> **Service:** Google Cloud Run
> **Status:** ✅ Completed

---

## 🎯 Objective

Deploy a containerized backend application to **Google Cloud Run** and understand the basic workflow involved in taking an application from a local Docker environment into a managed cloud runtime.

The goal of this checkpoint is not simply to make the application accessible online.

The goal is to understand the deployment pipeline:

```text
Application
    ↓
Dockerfile
    ↓
Docker Image
    ↓
Container Registry
    ↓
Google Cloud Run
    ↓
Public/Service Endpoint
    ↓
Logs & Monitoring
```

---

# 🧠 What I Learned

Through this checkpoint, I learned that deploying an application to the cloud does not necessarily require manually managing a virtual machine.

Google Cloud Run provides a managed environment where a container can be deployed as a service.

Instead of thinking:

```text
"Deploy my server to a VM"
```

the Cloud Run model encourages thinking:

```text
"Package my application as a container
and give the cloud platform the container to run."
```

This introduced me to the following concepts:

- Containers
- Docker images
- Container registries
- Cloud-managed application runtimes
- Environment variables
- Cloud deployment
- Service endpoints
- Application logs
- IAM and permissions
- Cloud resource configuration
- Stateless application architecture
- Automatic scaling

---

# 🏗️ Deployment Architecture

```text
┌───────────────────────┐
│     Application       │
│                       │
│ Backend / API Service │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│       Docker          │
│                       │
│      Dockerfile       │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│    Container Image    │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Google Cloud Registry │
│       / Artifact      │
│       Registry        │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│     Cloud Run         │
│                       │
│   Managed Container   │
│       Runtime         │
└───────────┬───────────┘
            │
            ▼
       Service URL
```

---

# 🔧 Deployment Workflow

## 1. Prepare the Application

The application must be capable of running inside a container.

Important considerations included:

- Application starts correctly
- Dependencies are installed
- Configuration is externalized
- The application listens on the expected port
- The application does not depend on local machine-specific resources

---

## 2. Create a Dockerfile

The application was packaged into a Docker image using a `Dockerfile`.

Example conceptual workflow:

```bash
docker build -t my-app .
```

The Docker image contains the environment required to run the application.

This makes the application more portable between:

```text
Local Machine
      ↓
Docker
      ↓
Cloud Environment
```

---

## 3. Authenticate With Google Cloud

Google Cloud CLI was used to authenticate and interact with the project.

Conceptually:

```bash
gcloud auth login
```

The correct Google Cloud project must also be selected.

```bash
gcloud config set project PROJECT_ID
```

---

## 4. Build / Push the Container

The container image needs to be available to Google's infrastructure.

Depending on the workflow, the image can be built and pushed through Google Cloud tooling and stored in **Artifact Registry**.

Conceptually:

```text
Local Dockerfile
      ↓
Container Image
      ↓
Artifact Registry
```

---

## 5. Deploy to Cloud Run

The container image was deployed as a Cloud Run service.

Conceptually:

```bash
gcloud run deploy SERVICE_NAME
```

During deployment, important configuration includes:

- Region
- Container image
- Service name
- Port
- Authentication
- Environment variables
- CPU / memory allocation
- Scaling configuration

---

# 🌐 Cloud Run Service

After deployment, Cloud Run provides a service endpoint that can be used to access the application.

The important mental model is:

```text
Client
   │
   ▼
Cloud Run URL
   │
   ▼
Cloud Run Service
   │
   ▼
Container Instance
   │
   ▼
Application
```

The cloud platform handles much of the underlying infrastructure management.

---

# 🔐 Security Considerations

A successful deployment is not automatically a secure deployment.

For future deployments, I need to consider:

### Secrets

Do not hardcode:

```text
API keys
Passwords
Database credentials
JWT secrets
Service credentials
```

inside:

```text
Source code
Dockerfile
Git repository
```

Use appropriate secret/configuration management instead.

---

### Authentication

Determine whether the Cloud Run service should be:

```text
Public
```

or:

```text
Authenticated
```

A public endpoint should only be exposed when that behavior is intentional.

---

### Least Privilege

Cloud resources and service accounts should receive only the permissions they actually require.

Avoid giving:

```text
Owner
Editor
Administrator
```

permissions when a narrower role is sufficient.

---

### Container Security

Future improvements:

- Use minimal base images
- Avoid running containers as root where possible
- Scan container images
- Keep dependencies updated
- Avoid unnecessary packages
- Use `.dockerignore`
- Pin important dependencies where appropriate

Potential security tooling:

```text
Trivy
Docker Scout
CodeQL
GitHub Actions
```

---

# 📊 Observability

After deployment, the application should not be treated as:

> "It works because I got a URL."

I should also be able to investigate the service.

Important areas:

```text
Cloud Run
   │
   ├── Logs
   ├── Revisions
   ├── Deployments
   ├── Resource Usage
   ├── Requests
   └── Errors
```

The ability to inspect logs is especially important when debugging:

- Application crashes
- Startup failures
- Port configuration problems
- Environment variable problems
- Dependency failures
- Database connection problems
- HTTP errors

---

# 🧪 Checkpoint Test

I should consider this checkpoint properly understood when I can answer these questions **without simply memorizing commands**.

### Containers

- What problem does Docker solve?
- What is a Docker image?
- What is a container?
- What is the difference between an image and a running container?
- Why does the application need to listen on the correct port?

### Cloud Run

- What is Cloud Run?
- Why would I use Cloud Run instead of managing a VM?
- What does Cloud Run actually run?
- What is a Cloud Run service?
- What is a revision?
- What happens when I deploy a new revision?

### Registry

- Why does Cloud Run need access to a container image?
- What is Artifact Registry?
- What is the relationship between a container image and a registry?

### Networking

- How does a request reach my application?
- What does the Cloud Run URL represent?
- What happens if my application is listening on the wrong port?
- What does public vs authenticated access mean?

### Security

- Where should secrets be stored?
- Why should secrets never be committed to Git?
- What is least privilege?
- What permissions does my deployed service actually need?

### Debugging

If deployment fails, I should know where to investigate:

```text
Build
 ↓
Container
 ↓
Registry
 ↓
Cloud Run Deployment
 ↓
Container Startup
 ↓
Application
 ↓
Database / External Services
```

---

# 🔁 Reproduction Challenge

## Goal

Reproduce the deployment **without following the original step-by-step tutorial**.

I should be able to:

1. Take a simple backend application.
2. Create a Dockerfile.
3. Build the image.
4. Push the image to a registry.
5. Deploy the image to Cloud Run.
6. Configure required environment variables.
7. Access the service.
8. Inspect Cloud Run logs.
9. Identify and fix a deliberate deployment failure.
10. Redeploy a corrected revision.

---

# 🚨 Failure Simulation

To prove that I understand the deployment rather than simply following commands, intentionally introduce problems such as:

### Failure 1 — Wrong Port

Configure the application to listen on a different port.

Expected learning:

```text
Cloud Run
   ↓
Container starts incorrectly
   ↓
Application cannot receive traffic
   ↓
Inspect logs / configuration
   ↓
Fix port
```

---

### Failure 2 — Missing Environment Variable

Remove a required environment variable.

Expected result:

```text
Application starts
        ↓
Configuration missing
        ↓
Application fails
        ↓
Inspect logs
        ↓
Fix configuration
```

---

### Failure 3 — Invalid Database Configuration

Provide an invalid database connection string.

Expected learning:

```text
Cloud Run
   ↓
Application
   ↓
Database connection
   ↓
Connection failure
   ↓
Logs
   ↓
Diagnosis
```

---

# 🧠 Key Mental Model

The most important concept from this checkpoint:

> **Cloud deployment is not magic. It is the process of packaging an application, providing the required configuration, giving infrastructure permission to run it, and making the application reachable and observable.**

The platform changes.

The underlying engineering problems remain similar.

```text
Docker
   ↓
Container
   ↓
Registry
   ↓
Runtime
   ↓
Networking
   ↓
Configuration
   ↓
Security
   ↓
Observability
```

This mental model should transfer to other cloud platforms.

---

# ☁️ AWS Transfer Challenge

After completing the Cloud Run checkpoint, attempt to deploy the same containerized application using AWS.

Before looking up the exact AWS commands, identify the equivalent concepts:

| Concept                   | Google Cloud                 | AWS                                   |
| ------------------------- | ---------------------------- | ------------------------------------- |
| Container image           | Artifact Registry            | ECR                                   |
| Managed container runtime | Cloud Run                    | ECS / Fargate                         |
| Identity & permissions    | IAM                          | IAM                                   |
| Logs                      | Cloud Logging                | CloudWatch                            |
| Container                 | Docker                       | Docker                                |
| CI/CD                     | Cloud Build / GitHub Actions | CodePipeline / GitHub Actions / other |
| Infrastructure            | GCP resources                | AWS resources                         |

The goal is **not** to memorize a translation table.

The goal is to recognize:

> "I have solved this category of problem before."

---

# 🏆 Completion Criteria

- [x] Containerized application
- [x] Built Docker image
- [x] Authenticated with Google Cloud
- [x] Configured Google Cloud project
- [x] Stored container image in cloud registry
- [x] Deployed application to Cloud Run
- [x] Obtained working service endpoint
- [x] Accessed deployed application
- [x] Introduced to Cloud Run configuration
- [x] Introduced to cloud logging
- [x] Introduced to IAM / permissions
- [ ] Reproduce deployment without tutorial
- [ ] Debug an intentionally broken deployment
- [ ] Implement secure secret management
- [ ] Add CI/CD deployment
- [ ] Reproduce deployment on AWS
- [ ] Compare Cloud Run vs AWS container deployment

---

# 📚 Next Steps

After this checkpoint:

```text
Google Cloud Run
       ↓
CI/CD Deployment
       ↓
AWS Container Deployment
       ↓
Infrastructure as Code
       ↓
Terraform
       ↓
Kubernetes
       ↓
Production-grade DevSecOps
```

---

## Reflection

### What I initially thought

> Cloud deployment looked more complicated and intimidating than it actually was.

### What I discovered

> A large portion of cloud engineering is learning how the platform maps to concepts I already understand: containers, networking, configuration, permissions, deployment, and logs.

### What I still need to learn

- IAM in greater depth
- Cloud networking
- Secret management
- CI/CD
- Infrastructure as Code
- AWS
- Kubernetes
- Production monitoring
- Cloud security

### Final Status

**☑ First real cloud deployment completed**

This checkpoint marks the transition from learning cloud concepts theoretically to actually deploying and operating an application in a cloud environment.
