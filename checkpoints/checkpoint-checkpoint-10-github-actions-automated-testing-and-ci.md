Checkpoint 09 — GitHub Actions, Automated Testing & Continuous Integration
Objective

Understand how GitHub Actions automates software validation by creating temporary runners that install dependencies, execute tests, and build applications whenever code is pushed.

This checkpoint introduces the foundations of Continuous Integration (CI).

Why this checkpoint matters

Before this checkpoint, software development looked like this:

Write code
↓
Run project manually
↓
Hope nothing broke

After this checkpoint:

Write code
↓
git push
↓
GitHub automatically verifies everything
↓
Pass / Fail

This is the foundation of:

CI/CD
DevOps
Cloud deployment
Team collaboration
Production pipelines
Main Questions

We asked:

How does GitHub automatically run commands?
What is a workflow?
What is a runner?
How does GitHub know if code is broken?
How do tests stop deployments?
How can GitHub build Docker images?
Step 1 — Create the Workflow Directory

GitHub only scans workflows inside:

.github/workflows/

Repository structure:

DevSecOps-Learning-Lab/

├── .github/
│ └── workflows/
│ └── hello.yml
│
├── checkpoints/
├── labs/
└── README.md
Step 2 — Create the First Workflow

File:

.github/workflows/hello.yml

Code:

name: My First Workflow

on: push

jobs:
hello:
runs-on: ubuntu-latest

    steps:
      - name: Say hello
        run: echo "Hello from GitHub Actions!"

What happens internally?

When running:

git push

GitHub performs:

git push
↓
GitHub receives new code
↓
Checks .github/workflows/
↓
Creates an Ubuntu runner
↓
Runs workflow steps
↓
Destroys the runner
GitHub Runner Mental Model

A runner is:

Temporary machine

GitHub provides:

Ubuntu
Windows
macOS

Example:

runs-on: ubuntu-latest
Step 3 — Install Node.js

Workflow:

- uses: actions/setup-node@v4

  with:
  node-version: 24

This prepares Node.js inside the GitHub runner.

Connection to Docker:

Docker GitHub Actions
FROM node:24 node-version: 24
Step 4 — Understanding uses

Example:

- uses: actions/checkout@v4

This action:

Clones the repository

inside the runner.

Without checkout:

GitHub runner has no access to project files.
Step 5 — Create the Testing Lab

Structure:

labs/github-actions/testing-lab/

├── math.js
├── math.test.js
└── package.json
math.js
function sum(a, b) {
return a + b;
}

module.exports = sum;
math.test.js
const sum = require("./math");

if (sum(2, 3) !== 5) {
throw new Error("❌ Test failed!");
}

console.log("✅ Test passed!");
package.json

Original:

"test": "echo \"Error: no test specified\" && exit 1"

Updated:

"scripts": {
"test": "node math.test.js"
}

Run:

npm test

Output:

✅ Test passed!
Step 6 — Add Automated Testing to GitHub Actions

Workflow:

name: Node CI

on: push

jobs:
test:

    runs-on: ubuntu-latest

    steps:

      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 24

      - name: Install dependencies
        run: npm install
        working-directory: labs/github-actions/testing-lab

      - name: Run tests
        run: npm test
        working-directory: labs/github-actions/testing-lab

CI Pipeline
git push
↓
GitHub runner starts
↓
Checkout repository
↓
Setup Node.js
↓
npm install
↓
npm test
↓
Success / Failure
Step 7 — Break the Code

Modified:

function sum(a, b) {
return a - b;
}

Workflow output:

Error: ❌ Test failed!

Process completed with exit code 1.
Exit Codes

Linux programs communicate using exit codes.

Exit Code Meaning
0 Success
1 Failure

Connection to Docker:

Exited (0)

Exited (1)

GitHub uses the same mechanism:

Exit code 0 → Workflow succeeds

Exit code 1 → Workflow fails
Continuous Integration (CI)

CI means:

Code changes are automatically verified.

Pipeline:

Developer pushes code
↓
GitHub runs tests
↓
Tests pass?
↓
YES → Continue

NO → Stop
Step 8 — Build Docker Images in GitHub

Workflow:

- name: Build Docker image
  run: |
  docker build \
   -t my-first-image \
   labs/docker/dockerfile-lab

GitHub automatically executed:

docker build -t my-first-image labs/docker/dockerfile-lab

inside the Ubuntu runner.

Full CI Pipeline
git push
↓
GitHub receives code
↓
Create Ubuntu runner
↓
Checkout repository
↓
Setup Node.js
↓
npm install
↓
npm test
↓
docker build
↓
Workflow result
Mental Models Built
Concept Mental Model
Workflow Recipe
Runner Temporary machine
Job Mission
Step Task
Test Safety check
Exit code Pass / Fail signal
CI Pipeline Quality-control assembly line
Commands Learned

Create workflow:

mkdir -p .github/workflows

Run tests:

npm test

Initialize Node:

npm init -y

Push code:

git add .

git commit -m "test(ci): add automated Node.js tests"

git push
Biggest Lesson

Continuous Integration is not magic.

GitHub automatically:

Creates machines
Downloads code
Installs dependencies
Runs tests
Builds applications
Builds Docker images

and blocks broken code from moving forward.

Connection to Future Topics

This checkpoint bridges:

GitHub Actions
↓
Continuous Integration
↓
Docker
↓
Continuous Deployment
↓
Cloud Platforms
↓
Kubernetes
Questions Asked During the Lab
What is a runner?
What does uses: mean?
Why does GitHub create Ubuntu machines?
How does GitHub know if code is broken?
Why do tests stop the workflow?
What are exit codes?
How does GitHub build Docker images?
How does CI protect deployments?
Biggest Discovery

GitHub Actions is not just automation.

It is a system that continuously proves:

"This code works."

before software reaches production. 🚀
