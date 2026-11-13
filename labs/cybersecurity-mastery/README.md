# Cybersecurity Mastery

## Overview

`cybersecurity-mastery/` is an independent cybersecurity learning journal within the [DevSecOps Learning Lab](../README.md). It is a place to review security concepts, practice technical skills in authorized environments, document hands-on work, and track learning progress over time.

The module is designed for deliberate, independent learning. Notes and exercises should explain the reasoning behind a security decision and record what was actually observed.

## Purpose

This module helps a learner to:

- Build and refresh cybersecurity fundamentals.
- Connect security principles to infrastructure, software, cloud, and operational workflows.
- Practice analysis and defensive techniques using controlled environments.
- Document experiments, results, limitations, and follow-up work.
- Identify knowledge gaps and turn them into focused review tasks.

## Learning scope

The module keeps the following domains available as a broad learning map:

1. Security Governance, Risk, and Compliance
2. Identity and Access Management
3. Network Security
4. Endpoint Security
5. Cloud Security
6. Security Operations and Incident Response
7. Vulnerability Management
8. Application and API Security
9. Data Protection and Privacy
10. Security Architecture and Engineering

The scope is intentionally broad. A topic is not considered completed merely because it appears in this list; completion should be supported by notes, practice evidence, or a documented lab result.

## Directory structure

- [`concepts/`](concepts/README.md) — foundational explanations and mental models.
- [`practice/`](practice/README.md) — independently developed questions, scenarios, and hands-on exercises.
- [`progress/`](progress/README.md) — learning status, weak areas, practice results, and follow-up actions.
- [`review/`](review/README.md) — condensed revision notes, checklists, and synthesis across topics.

At the current starting point, these directories contain guidance READMEs only. No lab, certification, skill, or result is claimed as completed unless a future entry documents it explicitly.

## Learning workflow

1. **Learn:** Build a foundation with the relevant material in [`concepts/`](concepts/README.md).
2. **Review:** Use [`review/`](review/README.md) to summarize relationships, controls, and trade-offs.
3. **Practice:** Work through an exercise in [`practice/`](practice/README.md) without relying on an answer key or copied solution.
4. **Document:** Record the objective, environment, steps, observations, and outcome.
5. **Reflect:** Capture mistakes and unresolved questions in [`progress/`](progress/README.md).
6. **Revisit:** Repeat or extend the exercise after addressing the identified weak areas.

Use clear status labels such as `Planned`, `In progress`, `Completed`, and `Needs review`. A completed entry should state what was done and include enough evidence or observations for the result to be checked later.

## Documentation standards

When adding a note or exercise, include the details that make it useful to your future self:

- Topic, objective, and current status.
- Scope, prerequisites, and authorized environment.
- Sources or assumptions used.
- Steps taken and relevant commands or configuration, with secrets removed.
- Expected result and actual result.
- Evidence such as sanitized output, screenshots, or a short explanation of the finding.
- Cleanup performed, limitations, and next steps.

Keep explanations precise, distinguish observation from inference, and update an entry when later testing changes the conclusion. Do not create empty files solely to suggest that a topic or lab exists.

## Safety principles

- Test only systems, accounts, data, and networks that you own or are explicitly authorized to assess.
- Prefer isolated labs, synthetic data, disposable credentials, and least-privilege access.
- Do not commit passwords, tokens, private keys, personal data, or other sensitive information.
- Avoid disruptive scanning, exploitation, persistence, or data collection outside the approved scope.
- Define stop conditions before testing and clean up temporary resources afterward.
- Handle discovered vulnerabilities responsibly and follow the applicable disclosure process.

## Relationship to the wider lab

This module complements the repository's cloud, application, infrastructure, and DevSecOps work. Cross-references should point to the relevant module without copying unrelated content into this directory.
