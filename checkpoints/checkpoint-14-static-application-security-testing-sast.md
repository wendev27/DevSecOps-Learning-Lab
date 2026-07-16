# Checkpoint 14 — Static Application Security Testing (SAST) with Semgrep

## Objective

Understand how Static Application Security Testing (SAST) tools analyze source code to detect security vulnerabilities without executing the application.

This checkpoint demonstrates how automated security scanners identify insecure coding practices before code reaches production.

---

# What We Built

We created a small Node.js application containing intentionally insecure code and scanned it using Semgrep.

The objective was to understand how SAST tools inspect source code and report potential vulnerabilities.

---

# Project Structure

```text
labs/security/sast-lab/

├── app.js
├── package.json
├── README.md
└── .gitignore
```

---

# Vulnerable Application

```javascript
const password = 'admin123';

function login(username) {
  eval(`console.log("Welcome ${username}")`);
}

console.log(password);

login('WenDev');
```

The code intentionally contains insecure patterns to demonstrate how SAST tools work.

---

# Tools Used

- Node.js
- JavaScript
- Semgrep

---

# Installation

Install Semgrep:

```bash
python3 -m pip install --user semgrep
```

Verify the installation:

```bash
semgrep --version
```

---

# Running the Scan

Move into the project directory:

```bash
cd labs/security/sast-lab
```

Run Semgrep:

```bash
semgrep --config=auto .
```

---

# Scan Results

Semgrep detected the following vulnerability:

```text
javascript.browser.security.eval-detected.eval-detected

Detected the use of eval().

eval() can be dangerous if used to evaluate dynamic content.
If the content comes from external input, it may lead to code injection vulnerabilities.
```

Affected code:

```javascript
eval(`console.log("Welcome ${username}")`);
```

---

# Why `eval()` Is Dangerous

The `eval()` function executes JavaScript code stored inside a string.

Example:

```javascript
eval("console.log('Hello')");
```

If attackers can control the input passed into `eval()`, they may execute arbitrary code.

Potential risks:

- Code Injection
- Remote Code Execution
- Data leaks
- Application compromise

Because of these risks, `eval()` should generally be avoided in production applications.

---

# What Is Static Application Security Testing (SAST)?

SAST analyzes source code without running the application.

Instead of executing the program, the scanner reviews the code and searches for dangerous patterns.

Workflow:

```text
Developer writes code
          ↓
SAST scans source files
          ↓
Potential vulnerabilities are detected
          ↓
Developers fix issues before deployment
```

---

# Security Layers Learned So Far

| Security Layer       | Tool                  |
| -------------------- | --------------------- |
| Secrets Management   | `.env` + `.gitignore` |
| Dependency Scanning  | `npm audit`           |
| Static Code Analysis | Semgrep               |

---

# Key Learnings

- SAST analyzes code statically without execution.
- Security issues can be detected before deployment.
- Dangerous functions such as `eval()` can introduce serious vulnerabilities.
- Security should be integrated into the development pipeline.
- Automated scanners help developers identify insecure code early.

---

# Commands Learned

```bash
semgrep --version

semgrep --config=auto .
```

---

# Outcome

Successfully used Semgrep to perform Static Application Security Testing (SAST) and detect insecure coding patterns inside a Node.js application.

This checkpoint demonstrates how modern DevSecOps pipelines automatically scan source code for vulnerabilities before applications are built and deployed.
