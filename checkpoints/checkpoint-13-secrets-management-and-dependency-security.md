Checkpoint #13 — Secrets Management & Dependency Security
Objective

Learn why secrets and third-party packages are among the biggest security risks in modern applications.

This checkpoint demonstrates:

Why API keys, tokens, and passwords must never be committed to Git.
How .gitignore protects sensitive files.
How environment variables are used in real projects.
How dependency scanners detect vulnerable packages.
Why blindly running npm audit fix --force can break production systems.
What We Built

Inside the secrets-lab, we explored:

Secrets Management
Created a .env file.
API_KEY=my-super-secret-key
DATABASE_URL=my-database-url
JWT_SECRET=my-secret
Prevented sensitive files from being pushed to Git.
.env
.env.local
.env.production
Verified that Git ignores secret files.
git status
Dependency Scanning

Initially, the project contained no vulnerabilities.

npm audit

Output:

found 0 vulnerabilities

We then intentionally installed an old vulnerable package:

npm install lodash@4.17.15

Running:

npm audit

revealed multiple vulnerabilities:

Prototype Pollution
Command Injection
Code Injection
ReDoS attacks
Key Concepts Learned

1. Secrets should never enter Git

Git remembers everything forever.

Even if you delete:

.env

later, it still exists in Git history.

2. .gitignore is your first defense

Example:

.env
.env.\*
node_modules/

This prevents accidental leaks.

3. Most modern applications depend on external code
   Your application
   ↓
   Express
   ↓
   Axios
   ↓
   Lodash
   ↓
   Hundreds of transitive packages

A vulnerable dependency can compromise an otherwise secure application.

4. Security fixes can break applications

Safe:

npm audit fix

Dangerous:

npm audit fix --force

--force may upgrade to incompatible versions and introduce breaking changes.

Commands Used
npm install lodash@4.17.15

npm audit

npm audit fix

git status
Architecture
Developer
↓
Writes secrets into .env
↓
.gitignore blocks sensitive files
↓
Git repository
↓
Dependency scanner checks packages
↓
Vulnerabilities detected
Folder Structure
labs/
└── security/
└── secrets-lab/
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── node_modules/
Biggest Lesson

Modern applications are built on top of thousands of lines of third-party code.

Security is not only about protecting your own code—it is also about protecting your dependencies and secrets.
