# 🛡️ Checkpoint 15 — CodeQL, Trivy, and Container Security

---

# 🎯 Objective

Understand how modern DevSecOps teams secure applications by integrating automated security scanning into the development lifecycle.

This checkpoint focused on answering an important question:

> How do companies detect security problems before software reaches production?

To answer that question, I explored:

- Static Application Security Testing (SAST)
- CodeQL
- Dependency scanning
- Container vulnerability scanning
- Container hardening
- Security best practices for Docker

---

# 📚 Topics Covered

## 🔎 Source Code Security

- Static Application Security Testing (SAST)
- CodeQL
- Security rules and queries
- GitHub Security tab

## 📦 Dependency Security

- `npm audit`
- Vulnerable packages
- Dependency trees
- Transitive dependencies

## 🐳 Container Security

- Trivy
- Base image vulnerabilities
- Container hardening
- Least privilege

---

# 🤔 Questions Explored During This Checkpoint

During this checkpoint, I investigated several important security questions.

## 🔐 Code Security

- How can vulnerabilities be detected automatically?
- How does GitHub scan repositories?
- What kinds of coding mistakes are dangerous?

## 📦 Dependency Security

- Why can an application become vulnerable even when my own code is secure?
- What are transitive dependencies?
- Why does `npm audit fix --force` sometimes break applications?

## 🐳 Container Security

- Why does a fresh Docker image already contain vulnerabilities?
- Why does Trivy report hundreds of CVEs?
- Which vulnerabilities belong to my code and which belong to Linux packages?
- Why should containers avoid running as root?

---

# 🔬 Labs and Experiments

---

# Part 1 — Dependency Scanning

## 🎯 Goal

Understand that vulnerabilities can come from third-party packages.

## 🧪 Experiment

Installed an intentionally vulnerable package:

```bash
npm install lodash@4.17.15
```

Scanned dependencies:

```bash
npm audit
```

Attempted automatic fixes:

```bash
npm audit fix
npm audit fix --force
```

## 🧠 What I Learned

- Applications depend on hundreds of packages.
- A single dependency can pull many sub-dependencies.
- Fixing vulnerabilities blindly may introduce breaking changes.
- Security fixes sometimes conflict with application compatibility.

---

# Part 2 — Static Application Security Testing (SAST)

## 🎯 Goal

Understand how security tools analyze source code.

## 📖 What is SAST?

Static Application Security Testing scans source code without executing it.

It detects:

- SQL Injection
- Command Injection
- Hardcoded credentials
- Unsafe APIs
- Dangerous patterns

---

## 🛠️ Tools Used

### Semgrep

Example:

```bash
semgrep scan .
```

Semgrep analyzes source code using predefined rules.

### CodeQL

CodeQL runs automatically inside GitHub Actions and provides:

- Security alerts
- Security dashboards
- Query-based analysis
- Repository-wide scanning

---

## ⚙️ GitHub Security Workflow

```text
Developer writes code
        ↓
Push to GitHub
        ↓
GitHub Actions
        ↓
CodeQL Analysis
        ↓
Security Alerts
```

---

## 🧠 What I Learned

- Security checks can run automatically.
- Developers do not need to inspect every file manually.
- Security can be integrated into CI pipelines.

---

# Part 3 — Trivy Container Scanning

## 🎯 Goal

Understand why containers inherit vulnerabilities.

---

## 🛠️ Installing Trivy

Ubuntu installation:

```bash
sudo apt-get install wget apt-transport-https gnupg lsb-release

wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key \
| gpg --dearmor \
| sudo tee /usr/share/keyrings/trivy.gpg > /dev/null
```

---

## 🔍 Scanning Docker Images

Example:

```bash
trivy image my-app:latest
```

---

## 📦 What Trivy Scans

Trivy scans:

- Linux packages
- Docker images
- Secrets
- Dependencies
- Misconfigurations

---

## 😵 First Observation

The first scan reported many vulnerabilities.

At first, this was confusing because the application itself was very small.

I eventually learned that vulnerabilities come from:

- Debian packages
- Node.js images
- Operating system components
- Transitive dependencies

The container inherits security issues from its base image.

---

## 🚨 Important Discovery

Security is inherited.

```text
Application
      ↓
Dependencies
      ↓
Base Image
      ↓
Linux Packages
      ↓
Kernel Components
```

A vulnerability can exist even if my own code contains no bugs.

---

# Part 4 — Container Hardening

## 📄 Original Dockerfile

```dockerfile
FROM node:24

WORKDIR /app

COPY app.js .

CMD ["node", "app.js"]
```

---

## ❌ Problems

The original image:

- Runs as root.
- Contains more packages.
- Has a larger attack surface.
- Increases risk.

---

## 🔒 Hardened Version

```dockerfile
FROM node:24-slim

WORKDIR /app

COPY app.js .

USER node

CMD ["node", "app.js"]
```

---

## ✅ Security Improvements

### Smaller Image

```dockerfile
FROM node:24-slim
```

Benefits:

- Fewer packages
- Smaller downloads
- Fewer vulnerabilities

### Non-Root User

```dockerfile
USER node
```

Benefits:

- Limits attacker privileges.
- Reduces damage if compromised.
- Follows security best practices.

---

# 🧠 Security Principles Learned

## 🔐 Principle of Least Privilege

Applications should receive only the permissions they need.

---

## 🏰 Minimize Attack Surface

Reduce:

- Installed packages
- Open ports
- Running services
- Privileges

---

## ⬅️ Shift Left Security

Security should happen:

```text
Write code
      ↓
Scan code
      ↓
Build container
      ↓
Scan container
      ↓
Deploy
```

Not:

```text
Deploy
      ↓
Find vulnerabilities
      ↓
Panic
```

---

# 🏗️ DevSecOps Pipeline

```text
Developer
    ↓
Git Push
    ↓
GitHub Actions
    ↓
Tests
    ↓
CodeQL
    ↓
Dependency Scan
    ↓
Docker Build
    ↓
Trivy Scan
    ↓
Deployment
```

---

# 💭 Reflection

Before this checkpoint, I thought:

> Docker simply packaged applications.

Now I understand that containers also carry:

- Operating systems
- Libraries
- Security risks
- Vulnerabilities

I learned that:

- ✅ Security is inherited.
- ✅ Secure code is not enough.
- ✅ Dependencies matter.
- ✅ Base images matter.
- ✅ Containers should not run as root.
- ✅ Security should be automated.

---

# 🚀 Next Checkpoint

## Checkpoint 16 — Secure CI/CD Pipelines

Upcoming topics:

- GitHub Actions security
- Secret handling
- Secure workflows
- CI/CD attack vectors
- Pipeline permissions
- Supply chain security

---
