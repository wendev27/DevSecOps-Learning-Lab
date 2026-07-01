Checkpoint 01
Topic

PNPM Fundamentals (Labs 1.0–1.5)

Objective

Understand how a modern JavaScript package manager works beyond simply running commands.

The goal was to replace memorization with a mental model of package management.

Concepts Learned

1. Why PNPM Exists

Before this lab I thought package managers simply downloaded dependencies.

Now I understand that PNPM was designed to avoid unnecessary duplication by maintaining a global package store.

2. Corepack

Learned that Corepack is not PNPM.

Instead it manages package managers like:

npm
pnpm
Yarn

It behaves more like a launcher than a package manager.

3. package.json

Purpose:

Defines what my project wants.

Acts as the project's dependency list.

4. pnpm-lock.yaml

Purpose:

Locks every dependency version to guarantee reproducible installations.

Everyone on the team installs the exact same dependency tree.

5. Global Package Store

Discovered that packages are stored here:

~/.local/share/pnpm/store

instead of inside every project.

This allows packages to be reused across projects.

6. Dependency Reuse

Observed:

Project A

downloaded 1

Project B

reused 1
downloaded 0

This proved that PNPM avoids downloading packages it already owns.

7. Version Isolation

Created projects using React 18 and React 19 simultaneously.

Observed that both versions coexist peacefully.

Projects are isolated from one another.

8. Direct vs Transitive Dependencies

Learned the difference between:

Direct dependencies

React
Axios
Zod

and their transitive dependencies.

This explained why installing three packages actually added twenty-nine packages.

9. Security Realization

One of the biggest lessons.

Installing packages from unknown projects can introduce risk.

The global store is only storage, but package installation can execute lifecycle scripts if a package defines them.

This introduced me to the concept of Software Supply Chain Security, a core part of DevSecOps.

10. Biggest Realization

The biggest lesson was not learning PNPM commands.

It was learning an engineering principle:

Avoid duplicating resources when they can be safely reused.

This same principle appears in:

Docker Layers
Git Objects
CPU Cache
Linux Filesystems
Database Buffer Pools
CDNs
Lessons I Want to Remember
Always understand why a tool exists before learning its commands.
Predict before experimenting.
Observe the result.
Correct my mental model.
Curiosity is more valuable than memorization.
Skills Unlocked

✅ Corepack

✅ PNPM

✅ Package Management

✅ Dependency Trees

✅ Lock Files

✅ Symlinks

✅ Global Package Store

✅ Version Management

✅ Supply Chain Security Awareness

Next Checkpoint

Docker Fundamentals
