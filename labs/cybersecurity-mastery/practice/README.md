# Cybersecurity Practice

## Overview

This directory is for independently developed practice questions, scenarios, and hands-on exercises that turn cybersecurity concepts into applied reasoning. Exercises should make it possible to compare an expected outcome with an observed outcome and to learn from mistakes.

The directory currently contains this guide only. Question banks, scenario sets, and lab records are planned work, not completed work, and should be added only when they serve a clear learning objective.

## Possible practice areas

Future material may include:

- Multiple-choice and short-answer questions with explanations.
- Scenario analysis involving security decisions and trade-offs.
- IAM permissions and least-privilege exercises.
- Network traffic inspection and firewall configuration.
- Endpoint and Linux hardening.
- Cloud security configuration and misconfiguration analysis.
- Log analysis and incident-response exercises.
- Vulnerability discovery, prioritization, and remediation validation.
- Application and API security testing.
- Container, CI/CD, threat-modeling, and security-architecture exercises.

If the collection grows, use clearly named subdirectories such as `question-bank/`, `scenario-sets/`, or `hands-on-labs/`. Do not create empty directories or placeholder files just to imply that material exists.

## Recommended practice workflow

1. Study the relevant material in [`concepts/`](../concepts/README.md).
2. Review the condensed guidance in [`review/`](../review/README.md).
3. Define the objective, scope, prerequisites, and stop conditions.
4. Complete the exercise without checking the solution prematurely.
5. Compare the result with the expected outcome and explain any difference.
6. Record mistakes, evidence, cleanup, and next steps in [`progress/`](../progress/README.md).

## Practice standards

- Develop questions and exercises independently or cite the source and license for adapted material.
- Explain why an answer or control is appropriate, including plausible alternatives where useful.
- Record actual results; do not present planned work as completed.
- Describe prerequisites, expected results, cleanup, and known limitations for hands-on work.
- Test only in systems and environments that are owned or explicitly authorized.
- Use synthetic data and disposable credentials wherever possible.
- Never store passwords, access tokens, private keys, or sensitive output in the repository.
