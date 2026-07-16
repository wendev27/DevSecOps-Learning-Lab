🚀 Phase 3 — CI/CD Cheat Sheet

resources/phase-3-cicd-cheatsheet.md

🚀 Phase 3: CI/CD
Pipeline flow
Developer pushes code

        ↓

GitHub Actions

        ↓

Run tests

        ↓

Build application

        ↓

Build Docker image

        ↓

Push image to Docker Hub

        ↓

Deploy
GitHub Actions structure
.github/

└── workflows/

    └── hello.yaml

Basic workflow
name: Node CI

on: push

jobs:

test:

    runs-on: ubuntu-latest

    steps:

      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4

      - run: npm install

      - run: npm test

Build Docker image

- name: Build Docker image

  run: |
  docker build -t my-app .
  Login to Docker Hub

- name: Login to Docker Hub

  uses: docker/login-action@v3

  with:
  username: ${{ secrets.DOCKER_USERNAME }}
  password: ${{ secrets.DOCKER_TOKEN }}
  Push image

- name: Push image

  run: |
  docker tag my-app username/my-app
  docker push username/my-app
  GitHub Secrets

Store:

✅ Docker token

✅ API keys

✅ Supabase keys

✅ MongoDB URI

✅ AWS credentials

❌ Never commit secrets into Git.

CI vs CD
CI (Continuous Integration)
Push code

→ Test

→ Build

→ Verify
CD (Continuous Deployment)
Push code

→ Test

→ Build

→ Deploy automatically
🧠 Biggest lesson from Phases 1–3
Code alone is not enough.

A real system needs:

Code

- Git
- Linux
- Containers
- Pipelines
- Deployment
