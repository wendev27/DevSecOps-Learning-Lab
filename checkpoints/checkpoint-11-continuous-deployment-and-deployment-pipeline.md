Checkpoint 11 — Docker Hub, Continuous Deployment & Deployment Pipelines
Objective

Understand how modern deployment pipelines automatically build, store, and distribute applications using GitHub Actions, Docker Hub, and secure credentials.

This checkpoint introduces the foundations of Continuous Deployment (CD) and demonstrates how CI pipelines evolve into deployment pipelines.

Why this checkpoint matters

Before this checkpoint:

Write code
↓
Build Docker image manually
↓
Tag image manually
↓
Push image manually
↓
Deploy manually

After this checkpoint:

Write code
↓
git push
↓
GitHub Actions starts
↓
Run tests
↓
Build Docker image
↓
Authenticate securely
↓
Push image to Docker Hub
↓
Deployment artifact is ready

This is the foundation of:

Continuous Deployment (CD)
Deployment pipelines
Cloud-native development
Infrastructure automation
Kubernetes
AWS and cloud platforms
Production releases
Main Questions

We asked:

How are Docker images stored?
What is Docker Hub?
Why do registries exist?
How can GitHub authenticate securely?
What are GitHub Secrets?
How do CI pipelines become deployment pipelines?
How does a server receive new versions of an application?
Step 1 — Create a Docker Hub account

We created a Docker Hub account and connected it with GitHub.

Docker Hub acts as:

GitHub → source code

Docker Hub → container images

GitHub stores:

app.js
Dockerfile
README.md

Docker Hub stores:

my-first-image:latest
Step 2 — Tag the image

Local image:

docker images

Result:

my-first-image

Tagged image:

docker tag my-first-image wendev27/my-first-image

Mental model:

Before:

my-first-image

After:

wendev27/my-first-image
Step 3 — Push to Docker Hub

Command:

docker push wendev27/my-first-image

Docker uploaded multiple layers:

Layer 1
Layer 2
Layer 3
...

Important discovery:

Docker does not re-upload everything every time.

It only uploads:

new layers
changed layers

Unchanged layers are reused.

Step 4 — Secure credentials with GitHub Secrets

Repository settings:

Settings
↓
Secrets and variables
↓
Actions

Created secrets:

DOCKER_USERNAME

DOCKER_TOKEN

Secrets allow GitHub Actions to authenticate without exposing passwords.

Rule learned:

Never store passwords, API keys, or tokens inside code.

Use GitHub Secrets instead.

Examples:

Docker tokens
MongoDB connection strings
Supabase keys
Vercel tokens
AWS credentials
API keys
Step 5 — Extend the GitHub Actions workflow

Workflow:

- name: Log in to Docker Hub
  uses: docker/login-action@v3
  with:
  username: ${{ secrets.DOCKER_USERNAME }}
  password: ${{ secrets.DOCKER_TOKEN }}

- name: Push Docker image
  run: |
  docker tag my-first-image wendev27/my-first-image:latest
  docker push wendev27/my-first-image:latest

GitHub successfully:

authenticated with Docker Hub
tagged the image
pushed the image automatically
hid the credentials inside the logs

The workflow logs prove that GitHub built the image and pushed it to Docker Hub automatically.

Complete Deployment Pipeline
Developer laptop
↓
git push
↓
GitHub receives code
↓
Create Ubuntu runner
↓
Checkout repository
↓
Install dependencies
↓
Run tests
↓
Build Docker image
↓
Authenticate with Docker Hub
↓
Push image
↓
Docker registry
↓
Production server
↓
Users
Continuous Integration vs Continuous Deployment
Concept Purpose
Continuous Integration (CI) Verify code automatically
Continuous Deployment (CD) Deliver software automatically
Docker Hub Store deployment artifacts
GitHub Secrets Protect credentials
Deployment Pipeline Move software toward production
Mental Models Built
Concept Mental Model
Docker Hub GitHub for containers
Registry Warehouse
Docker image Deployment package
Secret Encrypted vault
Pipeline Automated factory
Continuous Deployment Automatic delivery system
Commands Learned

Tag image:

docker tag my-first-image wendev27/my-first-image

Push image:

docker push wendev27/my-first-image

List local images:

docker images

Create GitHub secrets:

Repository Settings
↓
Secrets and variables
Biggest Lesson

Continuous Deployment is not magic.

Modern software companies automate:

testing
validation
image creation
authentication
artifact storage
deployment preparation

using pipelines.

GitHub Actions is not just a CI tool.

It is an automated software factory.

Connection to Future Topics
GitHub Actions
↓
Continuous Integration
↓
Docker Hub
↓
Continuous Deployment
↓
AWS
↓
Kubernetes
↓
Production infrastructure
Questions Asked During the Lab
Can Docker store images like GitHub stores code?
Why do Docker images need a registry?
How does GitHub authenticate safely?
Why do we need GitHub Secrets?
Can GitHub deploy automatically?
How do cloud platforms receive Docker images?
Does Vercel build containers internally?
What happens after docker push?
Biggest Discovery

The workflow you built is no longer just a test pipeline.

It has become a deployment pipeline:

Code
↓
Tests
↓
Container
↓
Registry
↓
Production

And that's the exact architecture behind modern cloud systems used by companies like Netflix, Spotify, Uber, and thousands of SaaS platforms. 🚀
