# 🐳 Checkpoint 04 — Docker Images & Containers

> **Goal:** Understand the relationship between Docker Images and Docker Containers, how containers are created from images, and why containers are temporary by design.

---

# 📅 Date

July 2026

---

# 🎯 Objectives

This checkpoint focused on understanding:

- Docker Hub
- Docker Images
- Docker Containers
- Image vs Container
- Container Lifecycle
- Why containers are ephemeral
- Basic Docker commands
- Mental models instead of memorizing commands

---

# 🧠 The Big Question

One of the biggest questions during this checkpoint was:

> **What exactly is a Docker Image?**

At first, it seemed similar to a Virtual Machine.

However, through experimentation, I discovered that Docker Images are much closer to **blueprints** than actual computers.

---

# Mental Model

The analogy that made everything click:

## 🏠 House Blueprint

```
Blueprint

↓

House #1

House #2

House #3
```

A blueprint never changes.

Instead...

It is used to build many houses.

Docker follows the exact same idea.

---

# Docker Image

A Docker Image is a read-only blueprint.

It contains everything required to build a container.

Examples:

- Ubuntu
- NGINX
- PostgreSQL
- Node.js

The image is not running.

It simply describes how to create a running environment.

---

# Docker Container

A Docker Container is a running instance created from an Image.

Mental Model:

```
Blueprint

↓

House
```

or

```
Recipe

↓

Cooked Meal
```

or

```
Windows ISO

↓

Installed Windows
```

The Image never changes.

Containers are created from the Image whenever needed.

---

# Docker Hub

Docker Images are stored inside Docker Hub.

Mental Model:

```
Docker Hub

↓

Warehouse

↓

Blueprint Storage
```

Instead of downloading software installers manually,

Docker downloads complete Images from Docker Hub.

---

# First Experiment

Checking available Images:

```bash
docker images
```

Initially:

```
No Images Found
```

---

Running:

```bash
docker run hello-world
```

Docker automatically performed several steps.

---

# What Docker Did Automatically

Step 1

Docker searched locally.

```
Do I already have hello-world?
```

Answer:

```
No
```

---

Step 2

Docker contacted Docker Hub.

```
Download hello-world
```

---

Step 3

Docker downloaded the Image.

---

Step 4

Docker created a Container from the Image.

---

Step 5

The Container executed.

---

Step 6

The Container stopped.

---

# Understanding the Output

Docker displayed:

```
Unable to find image 'hello-world:latest' locally
```

Meaning:

The Image did not exist on my computer.

Docker automatically downloaded it from Docker Hub.

---

After the download:

```
Status: Downloaded newer image
```

The Image became part of my local Image collection.

---

# Docker Images

Running:

```bash
docker images
```

Displayed:

```
hello-world
```

This means:

The blueprint now exists locally.

Docker will reuse it instead of downloading it again.

---

# Creating Multiple Containers

Running:

```bash
docker run hello-world
```

multiple times did NOT create multiple Images.

Instead:

```
1 Image

↓

Container A

Container B

Container C
```

The same Image was reused repeatedly.

---

# Docker PS

Running:

```bash
docker ps -a
```

Displayed every container ever created.

Example:

```
Container A

Exited

Container B

Exited

Container C

Exited
```

Every execution of:

```bash
docker run hello-world
```

created another Container.

---

# Difference Between Images and Containers

Images:

```
Blueprints
```

Containers:

```
Running Instances
```

One Image can produce thousands of Containers.

---

# Why Did The Container Exit?

One of the biggest discoveries.

The hello-world container has only one job.

```
Print Message

↓

Exit
```

After completing its task,

Docker automatically stopped the container.

This introduced the concept of the **Container Lifecycle**.

---

# Container Lifecycle

```
Created

↓

Running

↓

Exited
```

Containers are temporary by design.

Not every container runs forever.

Some execute a task and terminate immediately.

---

# Ubuntu Experiment

Running:

```bash
docker run -it ubuntu bash
```

Docker downloaded the Ubuntu Image from Docker Hub.

Instead of printing a message,

Docker opened an interactive Bash shell inside the container.

Prompt:

```text
root@xxxxxxxx:/#
```

This confirmed that I was now inside a Docker Container.

---

# Why Did Docker Download Ubuntu?

One of the biggest discoveries.

Even though my host operating system was already Ubuntu,

Docker still downloaded the Ubuntu Image.

Reason:

The Image is not my operating system.

It is a portable filesystem containing everything needed for a container.

Docker Containers share the Host Linux Kernel,

but they do not reuse the Host filesystem.

---

# Shared Linux Kernel

Mental Model:

```
Host Ubuntu

↓

Linux Kernel

──────────────

Container A

Container B

Container C
```

Every container shares the Host Kernel,

while maintaining its own isolated filesystem.

This is one reason Docker Containers are lightweight compared to Virtual Machines.

---

# Experiment Inside Ubuntu

Commands executed:

```bash
ls

cd

cat /etc/os-release
```

This confirmed:

- Different filesystem
- Different root directory
- Different environment
- Shared Linux Kernel

---

# Temporary Files

Created:

```bash
touch notes.txt
```

Then:

```bash
cat > notes.txt
```

Content:

```
Hello from container A!
```

The file existed successfully.

---

# Prediction

Question:

If Container A is deleted...

Will Container B automatically contain notes.txt?

Prediction:

No.

Containers are isolated.

Files created inside one container remain inside that specific container unless stored somewhere persistent.

This prediction became the foundation for the next checkpoint about Docker Volumes.

---

# Commands Used

```bash
docker --version

docker images

docker run hello-world

docker ps -a

docker run -it ubuntu bash

ls

cd

cat /etc/os-release

touch notes.txt

cat > notes.txt

cat notes.txt

exit
```

---

# Engineering Patterns Learned

## Pattern 1

Docker Hub

↓

Stores Images

---

## Pattern 2

Images

↓

Blueprints

---

## Pattern 3

Containers

↓

Running Instances

---

## Pattern 4

One Image

↓

Many Containers

---

## Pattern 5

Containers are Ephemeral

Anything created inside a container disappears if that container is deleted (unless external persistent storage is used).

---

# Biggest Discoveries

- Docker Images are blueprints, not running systems.
- Containers are created from Images.
- Docker automatically downloads missing Images from Docker Hub.
- One Image can create unlimited Containers.
- Containers have their own isolated filesystem.
- Containers share the Host Linux Kernel.
- Containers are temporary by design.
- `docker images` displays Images.
- `docker ps -a` displays Containers.

---

# Reflection

This checkpoint completely changed how I think about Docker.

At first, I believed Docker Images were similar to Virtual Machines or operating systems.

Through experimentation, I realized that an Image is better understood as a blueprint.

Containers are simply running instances created from that blueprint.

I also discovered that Docker automatically downloads missing Images from Docker Hub and reuses them for future containers instead of downloading them repeatedly.

One of the most important realizations was understanding that containers are ephemeral.

Anything created inside a container belongs only to that container.

Deleting the container deletes those changes.

This realization naturally led into the next topic: Docker Volumes and Persistent Storage.
