# Practice 02 — SmartFlood Containerization

## Related Project

- **Application repository:** [SmartFlood V5 AWS Migration](https://github.com/wendev27/Smart-Flood-V5-AWS)
- **Original application source:** [SmartFlood V4.1 — fe-be-merge](https://github.com/wendev27/SmartFlood-V4.1/tree/fe-be-merge)
- **AWS learning notes:** [AWS Concepts](../../concepts/README.md)
- **AWS practice index:** [Practice Labs](../README.md)

## Objective

Learn how to package the existing SmartFlood application into separate, reproducible container images before deploying it to AWS.

## Scope

- Frontend: Next.js
- API: Next.js route handlers
- AI service: FastAPI
- Containerization: Docker and Dockerfiles
- Security: non-root execution, secret exclusion, image scanning
- Validation: local builds, startup and service integration

## Learning rule

Every significant configuration change must explain:

1. What was changed.
2. Why the change was necessary.
3. How the configuration works.
4. What alternatives were considered.
5. How the result was validated.
6. What security or cost implications exist.

## Status

In progress — Dockerfile implementation and local validation.

Only mark a task complete after its implementation and validation have been recorded.

# SmartFlood Containerization

Containerize the SmartFlood application components and verify that each image
can be built and run locally.

- `frontend/` — frontend container work
- `api/` — API container work
- `ai/` — AI service container work
