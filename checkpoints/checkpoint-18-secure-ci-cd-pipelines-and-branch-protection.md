# 🛡️ Checkpoint 18 — Secure CI/CD Pipelines and Branch Protection

## 🎯 Objective

Understand how modern DevSecOps teams secure their CI/CD pipelines by integrating automated security scanning, branch protection rules, and deployment safeguards.

This checkpoint focused on answering an important question:

> "How do companies prevent insecure code from reaching production?"

To answer that question, I explored GitHub Actions, Trivy container scanning, branch protection rules, and security gates that automatically block deployments when critical vulnerabilities are detected.

---

# 📚 Topics Covered

- GitHub Actions workflows
- CI/CD pipelines
- Docker image scanning with Trivy
- Security gates
- Branch protection rules
- Required status checks
- Pull request enforcement
- CodeQL integration
- Secure deployment workflows
- GitHub repository rules

---

# 🤔 Questions Explored

- What happens when a CI pipeline fails?
- Can GitHub Actions automatically stop deployments?
- Why did GitHub still allow merging even when Trivy failed?
- What is the difference between automation and enforcement?
- How do companies protect their `main` branch?
- How do pull requests interact with CI/CD pipelines?
- Why do workflows need both `push` and `pull_request` triggers?
- How do security scanners prevent vulnerable containers from being deployed?

---

# 🔬 Labs and Experiments

## 1. Added Trivy Container Scanning

Integrated Trivy into the GitHub Actions workflow.

```yaml
- name: Scan Docker image with Trivy
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: my-first-image
    format: table
    severity: CRITICAL
    exit-code: 1
```

---

## 2. Configured Security Gates

The pipeline was configured to fail automatically whenever Trivy detected critical vulnerabilities.

Pipeline flow:

```text
Push code
    ↓
Install dependencies
    ↓
Run tests
    ↓
Build Docker image
    ↓
Scan image with Trivy
    ↓
Critical vulnerability found?

YES → Stop deployment ❌

NO → Continue ✅
```

---

## 3. Created Branch Protection Rules

Protected the `main` branch by enabling:

- Require pull requests before merging
- Require status checks to pass
- Require pull request approvals
- Require conversation resolution
- Restrict branch deletion
- Block force pushes

Required checks:

- CodeQL
- Node CI

---

## 4. Simulated a Broken Pipeline

Intentionally broke the test suite:

```javascript
if (2 + 2 !== 5) {
  throw new Error('❌ Test failed!');
}
```

GitHub Actions correctly failed:

```text
Error: Process completed with exit code 1.
```

The pull request merge button became disabled.

---

## 5. Fixed Workflow Triggers

Updated the workflow configuration:

Before:

```yaml
on: push
```

After:

```yaml
on:
  push:
  pull_request:
```

This ensured that the CI pipeline runs on both pushes and pull requests.

---

## 6. Tested Security Enforcement

Observed that:

- Failing CI pipelines prevent pull requests from being merged.
- Trivy blocks the workflow when critical vulnerabilities are found.
- Branch protection rules enforce repository policies.
- CodeQL and GitHub Actions work together to secure deployments.

---

# 🧠 Key Concepts

## CI/CD Automation vs Enforcement

Automation:

```text
Code pushed
    ↓
Run tests
    ↓
Run security scans
```

Enforcement:

```text
Security scan fails
    ↓
GitHub blocks merge
```

CI workflows alone do not protect a repository.

Branch protection rules transform warnings into enforced policies.

---

## Security Gates

A security gate is an automated checkpoint that determines whether code is allowed to continue through the deployment pipeline.

Examples:

- Unit tests
- CodeQL
- Trivy
- Pull request approvals
- Branch protection rules

---

## DevSecOps Pipeline

Final pipeline architecture:

```text
Developer
    ↓
GitHub Push
    ↓
GitHub Actions
    ↓
Run Tests
    ↓
Build Docker Image
    ↓
Trivy Scan
    ↓
CodeQL Analysis
    ↓
Branch Protection Rules
    ↓
Docker Hub / Production
```

---

# 💭 Reflection

This checkpoint completely changed how I think about deployments.

Before this lab, I assumed that CI/CD pipelines automatically prevented insecure code from reaching production.

I learned that:

- Security scanners only detect problems.
- CI workflows only automate tasks.
- Branch protection rules enforce security policies.
- Deployment safety comes from combining automation and enforcement.

One of the biggest realizations was understanding that companies do not rely solely on developers to make correct decisions.

Instead, they build systems that automatically prevent dangerous code from being merged or deployed.

I also learned that security policies depend on context:

- Banking and healthcare systems may block all critical vulnerabilities.
- Startups may allow deployments while generating warnings.
- DevSecOps is ultimately about balancing security and productivity.

---

# 🚀 Next Checkpoint

- OWASP Security Practices
- Secure coding principles
- Common web vulnerabilities
- Applying OWASP concepts to GitHub Actions, Docker, and CI/CD pipelines

Phase 4 is almost complete.
