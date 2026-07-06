# 📖 Checkpoint 03

# Docker Architecture & Ecosystem Foundations

---

# Theme

Understanding Docker before using Docker.

This checkpoint focuses on **why Docker exists**, **how Docker is architected**, and **how Linux securely installs software** before running our very first container.

---

# Objective

Before learning Docker commands, I wanted to understand:

- Why Docker exists.
- Why companies use Docker.
- Why Docker is installed using multiple packages.
- How Ubuntu decides whether Docker can be trusted.
- How Docker fits into the bigger software engineering ecosystem.

The goal of this checkpoint was to understand the architecture instead of memorizing commands.

---

# Initial Understanding

Before this checkpoint I believed:

- Docker was simply software used to deploy applications.
- Docker was similar to a Virtual Machine.
- Installing Docker was simply following installation commands from the internet.
- Docker was one application.

After completing this checkpoint, my understanding completely changed.

---

# Biggest Realization

Docker is **not one application**.

Docker is an ecosystem composed of multiple specialized components working together.

Just like a gaming PC consists of multiple hardware components,

Docker consists of multiple software components.

---

# Mental Model

Gaming PC

CPU

GPU

RAM

Motherboard

Storage

Power Supply

↓

Gaming Computer

---

Docker

Docker CLI

Docker Engine

containerd

Buildx

Compose

↓

Docker Platform

---

# Why Docker Exists

One of the biggest software engineering problems is:

"It works on my machine."

Applications often depend on:

- Operating System
- Node.js Version
- Python Version
- PostgreSQL
- Redis
- Environment Variables
- System Libraries
- Installed Tools

Two developers can clone the exact same repository and still experience different results because their environments are different.

Docker solves this problem by packaging the runtime environment together with the application.

Instead of sending only the application,

Docker allows developers to reproduce the same environment everywhere.

---

# Coffee Shop Analogy

Without Docker

Recipe

↓

Buy Equipment

↓

Buy Ingredients

↓

Train Staff

↓

Hope Everything Matches

---

With Docker

Entire Coffee Cart

✓ Equipment

✓ Recipe

✓ Instructions

↓

Every Coffee Shop Produces The Same Result

Docker focuses on consistency.

---

# McDonald's Analogy

Docker behaves similarly to a franchise.

Instead of sending only the burger recipe,

McDonald's provides:

- Equipment
- Kitchen Layout
- Operating Procedures
- Training
- Standards

Every branch behaves consistently.

Docker follows the same philosophy.

---

# Docker Components

Instead of installing only:

docker

we installed several specialized components.

---

## docker-ce

Docker Community Edition

Purpose:

The Docker Engine.

This is the core runtime responsible for managing containers.

Think of it as the heart of Docker.

---

## docker-ce-cli

Docker Command Line Interface.

Purpose:

Receives commands typed by the user and communicates with the Docker Engine.

Example:

docker run

docker build

docker ps

---

## containerd.io

Container Runtime.

Purpose:

Responsible for creating and running containers.

Docker delegates container execution to containerd.

---

## docker-buildx-plugin

Image Builder.

Purpose:

Responsible for building Docker Images.

Used whenever Docker builds applications.

---

## docker-compose-plugin

Service Orchestration.

Purpose:

Runs multiple services together.

Example:

Frontend

Backend

Database

Redis

can all start using a single command.

---

# Engineering Principle

Single Responsibility Principle

Every Docker component has one responsibility.

Instead of creating one massive application,

Docker is built from smaller specialized components.

This is the same software engineering principle used when building applications with reusable components.

---

# Connection to PNPM

During Checkpoint 01 I learned:

Project

↓

Dependencies

↓

Dependency Tree

Docker follows a similar philosophy.

Instead of dependency packages,

Docker contains specialized software components.

Patterns repeat across technologies.

---

# Software Trust

Before installing Docker,

Ubuntu must answer two questions.

Question 1

Who are you?

Question 2

Where do I download you?

Only after answering both questions can Ubuntu safely install Docker.

---

# Understanding GPG

Docker provides Ubuntu with a cryptographic public key.

Ubuntu stores this key and later uses it to verify packages downloaded from Docker's repository.

This prevents installing software from unknown or modified sources.

This is one layer of Supply Chain Security.

---

# Repository Preparation

Instead of immediately installing Docker,

the workstation was prepared first.

---

## Step 1

Remove Previous Docker Installations

Purpose:

Prevent future package conflicts caused by:

- Older Docker packages
- Partial installations
- Conflicting runtimes

Command:

```bash
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do
  sudo apt remove -y $pkg
done
```

Result:

Verified that no previous Docker installation existed.

---

## Step 2

Refresh Ubuntu Package Lists

Purpose:

Refresh Ubuntu's knowledge of available software.

Command:

```bash
sudo apt update
```

Result:

Ubuntu downloaded the newest package indexes.

---

## Step 3

Install Security Prerequisites

Purpose:

Prepare Ubuntu for secure communication.

Installed:

- ca-certificates
- curl
- gnupg

Command:

```bash
sudo apt install -y ca-certificates curl gnupg
```

Purpose of each:

ca-certificates

Verifies HTTPS certificates.

curl

Downloads files.

gnupg

Verifies cryptographic signatures.

---

## Step 4

Create Docker Keyring Directory

Purpose:

Store trusted repository keys.

Command:

```bash
sudo install -m 0755 -d /etc/apt/keyrings
```

Think of this directory as Ubuntu's secure filing cabinet for repository identities.

---

## Step 5

Download Docker Public Key

Purpose:

Teach Ubuntu how to recognize Docker.

Command:

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

Result:

Ubuntu can now verify Docker packages.

---

## Step 6

Grant Read Permission

Purpose:

Allow APT to access Docker's public key.

Command:

```bash
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

---

## Step 7

Register Docker Repository

Purpose:

Tell Ubuntu where Docker's repository is located.

Command:

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

This command dynamically:

- Detects system architecture
- Detects Ubuntu version
- Registers Docker's official repository

---

## Step 8

Refresh Package Lists Again

Purpose:

Teach Ubuntu about Docker's newly added repository.

Command:

```bash
sudo apt update
```

Result:

Ubuntu successfully contacted:

https://download.docker.com/linux/ubuntu

Ubuntu now knows Docker's official software warehouse.

---

## Step 9

Install Docker Ecosystem

Command:

```bash
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Installed Components:

- Docker Engine
- Docker CLI
- containerd
- Buildx
- Docker Compose

Result:

A complete Docker ecosystem was installed instead of only a single application.

---

# Linux Concepts Observed

During installation I also noticed:

Created symlink

This reinforced an earlier lesson from PNPM.

Linux repeatedly uses symbolic links across many technologies.

Symlinks are not unique to PNPM.

They are a core Linux concept.

---

# Engineering Patterns Observed

Different ecosystems solve similar problems.

PNPM

↓

Package Store

APT

↓

Repository

Docker

↓

Image Registry

Different names.

Same architectural pattern.

---

# Supply Chain Security

One of the biggest realizations.

Software should never be trusted blindly.

Modern software ecosystems verify:

Identity

↓

Repository

↓

Cryptographic Signature

↓

Download

↓

Installation

This protects developers against malicious software.

---

# Skills Unlocked

✅ Docker Architecture

✅ Docker Ecosystem

✅ Docker Engine

✅ Docker CLI

✅ containerd

✅ Docker Compose

✅ Buildx

✅ Ubuntu Repositories

✅ GPG Keys

✅ Supply Chain Security

✅ Single Responsibility Principle

✅ Software Distribution

---

# Biggest Mindset Shift

Before:

Docker is software.

After:

Docker is an ecosystem composed of specialized services working together.

---

# Connections to Previous Checkpoints

Checkpoint 01

Modern Package Management

↓

Introduced dependency graphs.

Checkpoint 02

Software Distribution & Trust

↓

Introduced repositories, GPG keys, and software verification.

Checkpoint 03

Docker Architecture

↓

Introduced software ecosystems built from specialized components.

Each checkpoint naturally builds upon the previous one.

---

# Questions I Asked During This Checkpoint

- Why are there multiple ways to install Docker?
- Why shouldn't Docker be installed using Snap?
- Why does Ubuntu need Docker's identity?
- Why isn't identity enough?
- Why does Ubuntu also need Docker's repository?
- Why are there multiple Docker packages?
- Why isn't Docker installed as a single application?
- Why does Docker use multiple specialized components?
- How is Docker similar to PNPM?
- Why does Docker solve "It works on my machine"?
- Why do companies use Docker even if their engineers know how to install everything manually?

---

# Next Checkpoint

Checkpoint 04

Docker Images, Containers & Running My First Container

Goal:

Understand what Images and Containers actually are before using them.
