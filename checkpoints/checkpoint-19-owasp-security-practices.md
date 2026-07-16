# 🛡️ Checkpoint 19 — OWASP Security Practices

## 🎯 Objective

Understand how OWASP security principles connect to modern DevSecOps tools and workflows.

This checkpoint focused on answering an important question:

> "How do real-world security risks connect to the tools used in modern CI/CD pipelines?"

To answer that question, I explored:

- OWASP Top 10 risks
- Secrets management
- Dependency scanning
- Static application security testing (SAST)
- Container security
- Secure CI/CD pipelines
- Branch protection rules

---

# 📚 What I Learned

OWASP is not a tool.

OWASP is a collection of security risks, best practices, and guidelines that help developers build secure applications.

Many of the tools I practiced throughout Phase 4 exist to mitigate OWASP risks.

---

# 🔥 OWASP Risks and Their DevSecOps Counterparts

| OWASP Risk                  | Tool / Practice          |
| --------------------------- | ------------------------ |
| SQL Injection               | Semgrep, CodeQL          |
| Sensitive Data Exposure     | `.env`, GitHub Secrets   |
| Vulnerable Components       | `npm audit`, Trivy       |
| Security Misconfiguration   | Branch Protection, CI/CD |
| Broken Access Control       | RBAC                     |
| Software Integrity Failures | CodeQL, Secure Pipelines |

---

# 🧪 Labs and Experiments

## Environment Variables and Secrets

Created:

```text
labs/security/secrets-lab/
```

Practiced:

- Storing secrets inside `.env`
- Preventing secret leaks with `.gitignore`
- Using GitHub Secrets inside workflows

---

## Dependency Scanning

Commands:

```bash
npm audit
npm audit fix
```

Experiment:

- Installed an old version of `lodash`
- Observed HIGH severity vulnerabilities
- Learned the risks of forced updates

---

## SAST (Static Application Security Testing)

Tool:

```bash
semgrep
```

Practiced:

- Detecting insecure code patterns
- Understanding static analysis

---

## CodeQL

Integrated GitHub CodeQL scanning.

Observed:

- Detection of clear-text logging
- Security findings inside the Security tab

---

## Trivy Container Scanning

Commands:

```bash
trivy image my-first-image
trivy image node:24-slim
```

Learned:

- Containers inherit vulnerabilities from base images.
- Smaller images reduce attack surface.
- Security is not only about application code.

---

## Secure CI/CD

Integrated Trivy into GitHub Actions:

```yaml
- name: Scan Docker image with Trivy
  uses: aquasecurity/trivy-action@master
```

Configured:

```yaml
severity: CRITICAL
exit-code: 1
```

Result:

- The pipeline automatically failed when critical vulnerabilities were detected.

---

## Branch Protection Rules

Learned how GitHub can enforce security policies by requiring:

- Pull requests
- Passing CI checks
- CodeQL scans
- Trivy scans

---

# 🧠 Key Insights

Security is not a single tool.

Modern DevSecOps combines:

Developer
↓
Secrets Management
↓
Dependency Scanning
↓
SAST
↓
CodeQL
↓
Container Security
↓
Secure CI/CD
↓
Branch Protection
↓
Deployment

OWASP provides the security model that connects all of these layers.

---

# 💭 Reflection

Before this checkpoint, I viewed security as individual tools and isolated vulnerabilities.

After completing Phase 4, I understand that modern application security is a chain of defenses that protects code before it reaches production.

---

# 🚀 Phase 4 Complete

Completed:

✅ Environment Variables & Secrets Management

✅ Dependency Scanning

✅ SAST

✅ CodeQL

✅ Trivy Container Scanning

✅ Container Security

✅ Secure CI/CD Pipelines

✅ OWASP Security Practices

The next step is:

🌐 Phase 5 — Infrastructure
