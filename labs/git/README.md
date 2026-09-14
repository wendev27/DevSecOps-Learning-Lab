# Git, GitHub & SSH Learning Roadmap

A structured, hands-on learning path for mastering **Git, GitHub, and SSH** from basic usage to professional team workflows.

This lab is designed around one principle:

> Don't memorize Git commands. Understand what Git is doing.

The goal is to move from:

```text
"I know how to use Git."
```

to:

```text
"I understand Git's state, can predict what will happen,
and can safely work inside a real development team."
```

---

## Learning Philosophy

This roadmap uses a checkpoint-based system.

A checkpoint is considered complete only when you can:

- Explain the concept
- Inspect its current state
- Predict what Git will do
- Perform the operation safely
- Explain the result afterward

The learning loop is:

```text
CONCEPT
   ↓
MENTAL MODEL
   ↓
YOUR REPOSITORY
   ↓
INSPECT
   ↓
PREDICT
   ↓
OPERATE
   ↓
VERIFY
   ↓
EXPLAIN
```

Commands are tools.

The real skill is understanding the state behind those commands.

---

# Roadmap

## Phase 1 — Git's Local Model

Understand what Git actually manages on your machine.

```text
Working Tree
     ↓
Staging Area / Index
     ↓
Local Repository
     ↓
Git History
```

### Checkpoints

- [ ] **CP01 — Working Tree**
- [ ] **CP02 — Staging Area / Index**
- [ ] **CP03 — Commits**
- [ ] **CP04 — HEAD**
- [ ] **CP05 — Branches**
- [ ] **CP06 — History**
- [ ] **CP07 — Git Status**
- [ ] **CP08 — Git Diff**
- [ ] **CP09 — Git Add**
- [ ] **CP10 — Restore / Switch**

### Phase Goal

Be able to explain:

```text
What changed?
Where does the change currently exist?
What has Git recorded?
What has Git NOT recorded?
```

---

# Phase 2 — Branches

Understand branches as references to commits rather than simply thinking of them as folders or copies of a project.

```text
             ┌── feature
             │
A ─── B ─── C ─── D
         ↑
        main
```

### Checkpoints

- [ ] **CP11 — Branch Pointers**
- [ ] **CP12 — Tracking Branches**
- [ ] **CP13 — Remote-Tracking Branches**
- [ ] **CP14 — Merge**
- [ ] **CP15 — Merge Conflicts**

### Phase Goal

Understand:

- What a branch actually is
- What `HEAD` points to
- How branches move
- Local branches vs remote-tracking branches
- Why conflicts happen
- How Git determines what needs to be merged

---

# Phase 3 — Remotes

Understand how your local repository communicates with GitHub.

```text
             GitHub
                ↑
              push
                │
Local Repository
                │
              fetch
                ↓
             GitHub
```

### Checkpoints

- [ ] **CP16 — Remote Model**
- [ ] **CP17 — Fetch**
- [ ] **CP18 — Push**
- [ ] **CP19 — Pull**
- [ ] **CP20 — origin/\***

### Phase Goal

Be able to explain:

```text
Local Branch
     ↓
Remote-Tracking Branch
     ↓
Remote Repository
```

And understand what actually moves during:

```bash
git fetch
git pull
git push
```

---

# Phase 4 — HTTPS vs SSH

Understand how Git authenticates with GitHub.

### Checkpoints

- [ ] **CP21 — Authentication**
- [ ] **CP22 — Authorization**
- [ ] **CP23 — HTTPS**
- [ ] **CP24 — SSH**

### Phase Goal

Understand the difference between:

```text
Authentication
"Who are you?"
```

and:

```text
Authorization
"What are you allowed to do?"
```

Also understand the difference between GitHub access through:

```text
HTTPS
```

and:

```text
SSH
```

---

# Phase 5 — SSH Internals

Go deeper into how SSH authentication actually works.

```text
Your Machine
     │
     │ SSH
     ↓
GitHub
     │
     ├── Public Key
     │
     └── Authentication
```

### Checkpoints

- [ ] **CP25 — SSH Key Pair**
- [ ] **CP26 — ssh-agent**
- [ ] **CP27 — known_hosts**
- [ ] **CP28 — Host Verification**
- [ ] **CP29 — GitHub SSH Authorization**

### Phase Goal

Understand:

- Private keys
- Public keys
- SSH agents
- Host verification
- `known_hosts`
- GitHub account authorization
- Why SSH can fail even when the key exists

---

# Phase 6 — Git & SSH Debugging

Learn how to troubleshoot Git and SSH instead of randomly changing configurations.

### Checkpoints

- [ ] **CP30 — Verbose SSH**
- [ ] **CP31 — Wrong Key**
- [ ] **CP32 — Wrong Account**
- [ ] **CP33 — SSH Configuration**
- [ ] **CP34 — Network / Port Issues**

### Phase Goal

When something fails, stop guessing.

Use evidence.

```text
Problem
   ↓
Inspect
   ↓
Identify Layer
   ↓
Test Hypothesis
   ↓
Fix
   ↓
Verify
```

You should eventually be able to distinguish:

```text
Network problem
      vs
SSH problem
      vs
Key problem
      vs
Git configuration problem
      vs
GitHub authorization problem
```

---

# Phase 7 — Professional GitHub Workflow

Move from individual Git usage to real team development.

```text
Issue
  ↓
Branch
  ↓
Implementation
  ↓
Testing
  ↓
Diff Review
  ↓
Commit
  ↓
Push
  ↓
Pull Request
  ↓
Code Review
  ↓
Changes
  ↓
Approval
  ↓
Merge
```

### Checkpoints

- [ ] **CP35 — Issue → Branch**
- [ ] **CP36 — Implementation**
- [ ] **CP37 — Testing**
- [ ] **CP38 — Diff Review**
- [ ] **CP39 — Commit**
- [ ] **CP40 — Pull Request**
- [ ] **CP41 — Code Review**
- [ ] **CP42 — Merge**

### Phase Goal

Be able to work on a real repository without treating Git as an afterthought.

You should understand:

```text
Why was this branch created?

What problem is it solving?

What changed?

Why did it change?

Was it tested?

Is the diff clean?

Is the commit understandable?

Can another developer review it?

```

---

# Phase 8 — Advanced Git

Learn the tools used when normal Git workflows aren't enough.

### Checkpoints

- [ ] **CP43 — Rebase**
- [ ] **CP44 — Interactive Rebase**
- [ ] **CP45 — Cherry-pick**
- [ ] **CP46 — Stash**
- [ ] **CP47 — Reset**
- [ ] **CP48 — Reflog**
- [ ] **CP49 — Bisect**
- [ ] **CP50 — Force-with-lease**
- [ ] **CP51 — Releases**

### Phase Goal

Understand how to safely manipulate Git history.

Important rule:

> Never use a dangerous Git command just because you found it on Stack Overflow.

Before using commands such as:

```bash
git reset
git rebase
git push --force-with-lease
```

you should understand what happens to:

```text
HEAD
Branch Pointer
Commit History
Working Tree
Staging Area
Remote Repository
```

---

# Complete Checkpoint List

## Phase 1 — Local Model

| Checkpoint | Topic                | Status |
| ---------- | -------------------- | ------ |
| CP01       | Working Tree         | ⬜     |
| CP02       | Staging Area / Index | ⬜     |
| CP03       | Commits              | ⬜     |
| CP04       | HEAD                 | ⬜     |
| CP05       | Branches             | ⬜     |
| CP06       | History              | ⬜     |
| CP07       | Git Status           | ⬜     |
| CP08       | Git Diff             | ⬜     |
| CP09       | Git Add              | ⬜     |
| CP10       | Restore / Switch     | ⬜     |

## Phase 2 — Branches

| Checkpoint | Topic                    | Status |
| ---------- | ------------------------ | ------ |
| CP11       | Branch Pointers          | ⬜     |
| CP12       | Tracking Branches        | ⬜     |
| CP13       | Remote-Tracking Branches | ⬜     |
| CP14       | Merge                    | ⬜     |
| CP15       | Merge Conflicts          | ⬜     |

## Phase 3 — Remotes

| Checkpoint | Topic        | Status |
| ---------- | ------------ | ------ |
| CP16       | Remote Model | ⬜     |
| CP17       | Fetch        | ⬜     |
| CP18       | Push         | ⬜     |
| CP19       | Pull         | ⬜     |
| CP20       | origin/\*    | ⬜     |

## Phase 4 — HTTPS vs SSH

| Checkpoint | Topic          | Status |
| ---------- | -------------- | ------ |
| CP21       | Authentication | ⬜     |
| CP22       | Authorization  | ⬜     |
| CP23       | HTTPS          | ⬜     |
| CP24       | SSH            | ⬜     |

## Phase 5 — SSH Internals

| Checkpoint | Topic                    | Status |
| ---------- | ------------------------ | ------ |
| CP25       | SSH Key Pair             | ⬜     |
| CP26       | ssh-agent                | ⬜     |
| CP27       | known_hosts              | ⬜     |
| CP28       | Host Verification        | ⬜     |
| CP29       | GitHub SSH Authorization | ⬜     |

## Phase 6 — Debugging

| Checkpoint | Topic                 | Status |
| ---------- | --------------------- | ------ |
| CP30       | Verbose SSH           | ⬜     |
| CP31       | Wrong Key             | ⬜     |
| CP32       | Wrong Account         | ⬜     |
| CP33       | SSH Configuration     | ⬜     |
| CP34       | Network / Port Issues | ⬜     |

## Phase 7 — Professional Workflow

| Checkpoint | Topic          | Status |
| ---------- | -------------- | ------ |
| CP35       | Issue → Branch | ⬜     |
| CP36       | Implementation | ⬜     |
| CP37       | Testing        | ⬜     |
| CP38       | Diff Review    | ⬜     |
| CP39       | Commit         | ⬜     |
| CP40       | Pull Request   | ⬜     |
| CP41       | Code Review    | ⬜     |
| CP42       | Merge          | ⬜     |

## Phase 8 — Advanced Git

| Checkpoint | Topic              | Status |
| ---------- | ------------------ | ------ |
| CP43       | Rebase             | ⬜     |
| CP44       | Interactive Rebase | ⬜     |
| CP45       | Cherry-pick        | ⬜     |
| CP46       | Stash              | ⬜     |
| CP47       | Reset              | ⬜     |
| CP48       | Reflog             | ⬜     |
| CP49       | Bisect             | ⬜     |
| CP50       | Force-with-lease   | ⬜     |
| CP51       | Releases           | ⬜     |

---

# Progress

Current checkpoint:

```text
CP01 — Working Tree
```

Overall progress:

```text
[░░░░░░░░░░░░░░░░░░░░] 0 / 51
```

---

# Checkpoint Completion Standard

A checkpoint should not be marked complete simply because the command worked.

For each checkpoint:

### 1. Concept

Can you explain what the concept represents?

### 2. Inspection

Can you inspect its current state?

### 3. Prediction

Can you predict what Git will show before running the command?

### 4. Operation

Can you perform the operation safely?

### 5. Verification

Can you confirm what changed?

### 6. Explanation

Can you explain why Git produced that result?

---

# Command Safety Rules

During the learning process, commands will be introduced deliberately.

Do not run commands ahead of the current checkpoint just because they appear in documentation.

Especially avoid blindly executing:

```bash
git reset
git rebase
git push --force
git push --force-with-lease
git clean
```

until the relevant checkpoint has been completed.

The objective is **understanding before automation**.

---

# Repository Used for Practice

The primary practice repository is:

```text
easy-hire
```

The repository is used as a realistic development environment for learning Git and GitHub workflows.

The learning process should avoid unnecessary changes to the repository.

When practicing destructive or risky operations, use a dedicated practice repository or controlled branch when appropriate.

---

# Git Mental Model

The core model to remember:

```text
                 YOUR COMPUTER
┌────────────────────────────────────────────┐
│                                            │
│  Working Tree                              │
│       │                                    │
│       │ git add                            │
│       ↓                                    │
│  Staging Area / Index                      │
│       │                                    │
│       │ git commit                         │
│       ↓                                    │
│  Local Repository                          │
│       │                                    │
│       │ git push                           │
└───────┼────────────────────────────────────┘
        │
        ↓
   GitHub Remote
```

And when downloading changes:

```text
GitHub Remote
     │
     │ git fetch
     ↓
Remote-Tracking Branch
     │
     │ merge / rebase / pull
     ↓
Local Branch
     │
     ↓
Working Tree
```

---

# SSH Mental Model

SSH authentication can be thought of as:

```text
Your Computer
     │
     ├── Private Key
     │
     ├── Public Key
     │
     ├── ssh-agent
     │
     └── SSH Configuration
              │
              ↓
          SSH Connection
              │
              ↓
            GitHub
              │
              ├── Host Verification
              │
              └── Account Authorization
```

The private key should remain private.

Never commit private keys into a repository.

---

# What This Roadmap Should Teach

By the end of this roadmap, you should be comfortable with:

### Git

- Working trees
- Staging
- Commits
- HEAD
- Branches
- History
- Diffs
- Merge
- Rebase
- Reset
- Reflog
- Cherry-pick
- Bisect
- Stash

### GitHub

- Repositories
- Remotes
- Issues
- Branches
- Pull Requests
- Reviews
- Merge workflows
- Remote-tracking branches
- Collaboration

### SSH

- Public/private key pairs
- Authentication
- Authorization
- ssh-agent
- known_hosts
- Host verification
- SSH configuration
- GitHub SSH authentication
- SSH debugging

### Professional Workflow

```text
Issue
 ↓
Branch
 ↓
Code
 ↓
Test
 ↓
Review Diff
 ↓
Commit
 ↓
Push
 ↓
Pull Request
 ↓
Review
 ↓
Changes
 ↓
Approval
 ↓
Merge
```

---

# Final Objective

The end goal is not:

```text
"I know 50 Git commands."
```

The goal is:

```text
"I understand Git well enough to work safely
inside a real engineering team."
```

You should be able to encounter a situation such as:

```text
"My branch is behind."

"My push was rejected."

"Git says there is a conflict."

"SSH says Permission denied."

"Why is origin/main different from main?"

"I accidentally reset something."

"My PR has conflicts."

"Why did this rebase change my commit hashes?"
```

and respond with:

```text
Inspect
 ↓
Understand the state
 ↓
Form a hypothesis
 ↓
Choose the appropriate operation
 ↓
Verify
```

rather than:

```text
Google random Git command
 ↓
Copy/paste
 ↓
Hope
```

---

# Learning Status

```text
Phase 1  — Git's Local Model       ⬜
Phase 2  — Branches                ⬜
Phase 3  — Remotes                 ⬜
Phase 4  — HTTPS vs SSH            ⬜
Phase 5  — SSH Internals           ⬜
Phase 6  — Debugging               ⬜
Phase 7  — Professional Workflow   ⬜
Phase 8  — Advanced Git             ⬜
```

**Current:** CP01 — Working Tree

**Total Checkpoints:** 51

**Completed:** 0

**Status:** 🟢 Learning

---

## Rule of the Lab

> **Predict first. Execute second. Verify third. Explain last.**

That is how Git becomes a mental model instead of a collection of commands.
