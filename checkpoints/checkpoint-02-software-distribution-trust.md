📖 Checkpoint 02 — Software Distribution, Trust & Docker Foundations
Checkpoint 02
Theme

Software Distribution, Trust, and the Foundation of Docker

Why This Checkpoint Exists

The original goal was to install Docker on my Linux workstation.

However, before installing Docker, I realized that understanding how Linux trusts software is far more important than memorizing installation commands.

This checkpoint focuses on the concepts that every software engineer should understand before installing any major development tool.

Initial Thoughts

Before this checkpoint, my understanding was:

Docker is something that "runs applications."
Docker is similar to a virtual machine.
Docker is mainly used for deploying applications.
Installing Docker is just running a few commands from the internet.

After this checkpoint, I realized Docker is much more than that.

Biggest Realization
Every Software Ecosystem Has the Same Architecture

Although different technologies use different names, they all follow a very similar pattern.

Developer

↓

Identity

↓

Trusted Source

↓

Download

↓

Verification

↓

Installation

Examples:

PNPM
Package

↓

npm Registry

↓

Download

↓

Project
Ubuntu (APT)
Software Package

↓

APT Repository

↓

Download

↓

System
Docker (coming next)
Docker Image

↓

Docker Registry

↓

Download

↓

Container
Engineering Principle

Different technology.

Same architecture.

Mental Model #1
Identity + Location

Installing software requires answering two important questions.

Question 1

Who are you?

Software must prove its identity.

This is why repositories use cryptographic signatures.

Question 2

Where do you live?

Even after trusting Docker, Ubuntu still doesn't know where to download it.

It needs the repository location.

Only after knowing BOTH can Ubuntu safely install software.

Understanding Software Trust

I learned that Ubuntu does not blindly trust software.

Instead, Ubuntu verifies the identity of software publishers before installing packages.

This helps protect users against malicious or modified packages.

This process is one part of modern Supply Chain Security.

What is GPG?

GPG (GNU Privacy Guard) is used to verify the authenticity of repositories.

Think of it as a digital ID card.

Docker provides Ubuntu with its public key.

Ubuntu stores this key and uses it later to verify downloaded packages.

Without verification, Ubuntu refuses to trust the repository.

Why We Installed These Packages
ca-certificates
curl
gnupg
ca-certificates

Allows Ubuntu to verify HTTPS certificates.

Purpose:

Secure communication.

curl

Downloads files from the internet.

Purpose:

Retrieve Docker's public key.

gnupg

Verifies cryptographic signatures.

Purpose:

Confirm repository authenticity.

Docker Installation (Preparation)

Instead of immediately installing Docker, we prepared Ubuntu first.

Step 1

Removed old Docker packages.

Purpose:

Prevent package conflicts.

Result:

My workstation had no previous Docker installation.

Step 2

Updated APT package lists.

Purpose:

Refresh Ubuntu's knowledge of available packages.

Step 3

Installed required security tools.

Purpose:

Allow Ubuntu to securely communicate with Docker's repository.

Step 4

Created

/etc/apt/keyrings

Purpose:

Ubuntu stores trusted repository keys here.

Think of it as a secure filing cabinet.

Step 5

Downloaded Docker's public key.

Purpose:

Teach Ubuntu how to recognize Docker.

Step 6

Changed permissions.

Purpose:

Allow APT to read Docker's key.

Mental Model #2
Identity is NOT enough

I initially thought:

Ubuntu knows Docker's identity.

↓

Therefore Docker can now be installed.

Wrong.

I forgot one important thing.

Ubuntu still needs to know:

Where is Docker's repository?

This realization connected directly to what I learned in PNPM.

Connection to PNPM

PNPM taught me about:

Package Managers
Package Stores

Docker installation introduced:

Package Repositories
Trusted Sources

Both systems share similar architecture.

Supply Chain Security

One of the biggest realizations of this checkpoint.

Earlier I asked:

What if a cloned project installs a malicious dependency?

Now I understand this problem exists everywhere.

Examples:

npm packages
Docker images
Ubuntu repositories
GitHub Releases

Modern software engineering depends heavily on trust.

Supply Chain Security exists to verify software before using it.

Docker Philosophy

Before this checkpoint I thought Docker was mainly about deployment.

Now I understand its real purpose.

Docker exists because software should not depend on one developer's personal computer.

Instead of sending only the project,

Docker packages the environment needed to run the project.

Coffee Shop Analogy

Without Docker

Recipe

↓

Buy equipment

↓

Buy ingredients

↓

Hope everything matches

With Docker

Entire Coffee Cart

✓ Equipment

✓ Recipe

✓ Instructions

↓

Every shop behaves the same

Docker provides consistency.

SmartFlood Example

Without Docker

Clone Repository

↓

Install Node

↓

Install PostgreSQL

↓

Install Redis

↓

Install pnpm

↓

Configure Environment Variables

↓

Hope it works

With Docker

Clone Repository

↓

Start Docker

↓

Environment recreated

↓

Application starts
Important Correction

I initially thought Docker exists because some developers do not know how to install software.

Correction:

Docker exists because every developer's environment is different.

Docker standardizes environments.

Engineering Principles Learned
Principle 1

Understand why a tool exists before learning its commands.

Principle 2

Every software ecosystem has:

Identity

Repository

Verification

Installation

Principle 3

Patterns repeat across technologies.

The more patterns I recognize, the easier new technologies become.

Principle 4

Trust should never be assumed.

Always verify software sources.

Skills Unlocked

✅ Ubuntu Package Management

✅ Official Repositories

✅ GPG Keys

✅ Repository Trust

✅ Supply Chain Security

✅ Docker Motivation

✅ Software Distribution

✅ Engineering Pattern Recognition

Biggest Mindset Shift

Before:

Install Docker because tutorials say so.

After:

I now understand how Linux decides whether Docker can be trusted, where Docker comes from, and why Docker exists before even installing it.

Next Checkpoint

Checkpoint 03

Theme

Docker Images, Containers & Building My First Container

# Questions I Asked During This Checkpoint

Why do websites need Docker?
Why are there three Docker installation methods?
Why shouldn't we use Snap for Docker?
Why does Ubuntu need Docker's identity before installing it?
Why isn't identity enough?
Why does Ubuntu also need the repository location?
How is this similar to PNPM?
How does this relate to Supply Chain Security?
Why do professionals use Docker even if they know how to install everything manually?
