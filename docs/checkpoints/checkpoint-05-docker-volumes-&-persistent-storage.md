# 🐳 Checkpoint 05 — Docker Volumes & Persistent Storage

> **Goal:** Understand why Docker containers are temporary and how Docker Volumes preserve important data even when containers are deleted.

---

# 📅 Date

July 2026

---

# 🎯 Objectives

This checkpoint focused on understanding:

- Ephemeral Storage
- Persistent Storage
- Docker Volumes
- Why application data should not live inside containers
- The `-v` flag
- The relationship between Images, Containers, and Volumes

---

# 🧠 The Problem

During the previous checkpoint, I discovered that creating a file inside a container does **not** make it permanent.

Example:

```bash
touch notes.txt
```

The file existed while the container was alive.

However...

After deleting the container:

```bash
docker rm <container-id>
```

The file disappeared.

This proved that container storage is **ephemeral**.

---

# Ephemeral Storage

Ephemeral means:

> Temporary.

Anything stored directly inside a container belongs only to that specific container.

If the container is deleted, the data disappears with it.

Example:

```
Container A

↓

notes.txt

↓

Delete Container

↓

💀 notes.txt disappears
```

This behavior is intentional because containers are designed to be disposable.

---

# Why This Is a Problem

Imagine a real application.

Examples:

- Banking System
- SmartFlood
- Facebook
- Netflix

If user data were stored inside containers:

```
Restart Server

↓

Delete Container

↓

All users gone

↓

All donations gone

↓

Database destroyed
```

Clearly, application data must survive beyond the lifetime of a container.

---

# Docker Volumes

Docker Volumes solve this problem.

A Docker Volume is persistent storage managed by Docker.

Volumes exist **outside** containers.

Containers can be deleted.

Volumes remain.

---

# Relationship

```
Docker Image
      │
      ▼
 Container
      │
      ▼
 Docker Volume
```

Notice:

The Volume is **not inside the Image**.

The Volume is attached to the Container.

---

# Analogy

Docker Image

↓

Blueprint

Docker Container

↓

House built from the blueprint

Docker Volume

↓

Storage room beside the house

The house may be demolished.

The storage room remains.

---

# Creating My First Volume

List existing volumes:

```bash
docker volume ls
```

Initially:

```
DRIVER    VOLUME NAME
```

No custom volumes existed.

Create a new Volume:

```bash
docker volume create my-notes
```

Result:

```
my-notes
```

Verify:

```bash
docker volume ls
```

Output:

```
DRIVER    VOLUME NAME

local     my-notes
```

---

# Understanding DRIVER

The output displayed:

```
local
```

Meaning:

Docker stores this Volume locally on my machine.

Docker also supports other storage drivers such as cloud storage and network storage, but this checkpoint focused only on the local driver.

---

# Mounting a Volume

Command:

```bash
docker run -it \
-v my-notes:/notes \
ubuntu \
bash
```

---

# Breaking Down the Command

## docker run

Create and start a new container.

If the required Image is missing:

```
Check Image

↓

Download Image

↓

Store Image

↓

Create Container

↓

Start Container
```

If the Image already exists locally:

```
Reuse Image

↓

Create Container

↓

Start Container
```

---

## -it

Interactive Terminal.

Allows me to interact with the running container using Bash.

---

## -v

Mount a Docker Volume.

---

## my-notes

The Docker Volume created earlier.

Verified using:

```bash
docker volume ls
```

---

## :

One of the most important symbols learned.

Mental Model:

```
Outside

↓

Inside
```

or

```
Host

↓

Container
```

Meaning:

```
my-notes

↓

/notes
```

The colon connects the external Volume with an internal directory.

---

## /notes

Directory inside the container.

Docker mounts the Volume here.

If the directory does not exist, Docker creates it automatically.

---

## ubuntu

The Docker Image (Blueprint).

---

## bash

The first program executed when the container starts.

Instead of immediately running an application, Docker launches the Bash shell so I can interact with the container.

---

# First Mistake (Important Lesson)

Initially I accidentally created:

```
/forever.txt
```

instead of:

```
/notes/forever.txt
```

After deleting the container, the file disappeared.

This accidentally re-proved that files stored directly inside containers are ephemeral.

---

# Correct Experiment

Inside the mounted Volume:

```bash
cd /notes

touch forever.txt

cat > forever.txt
```

Content:

```
Hello from Docker Volume!
```

Verify:

```bash
cat forever.txt
```

Output:

```
Hello from Docker Volume!
```

---

# Persistence Test

Delete the container:

```bash
docker rm <container-id>
```

Create a brand-new container:

```bash
docker run -it \
-v my-notes:/notes \
ubuntu \
bash
```

Navigate:

```bash
cd /notes
```

Verify:

```bash
cat forever.txt
```

Output:

```
Hello from Docker Volume!
```

The file survived even though the original container had been deleted.

---

# Biggest Discovery

Containers are temporary.

Volumes are permanent.

```
Container A

↓

Volume

↓

Delete Container

↓

Container B

↓

Same Volume

↓

Same Data
```

This completely changed my understanding of Docker storage.

---

# Engineering Patterns Discovered

## Pattern 1

Images

↓

Blueprints

---

## Pattern 2

Containers

↓

Running instances

---

## Pattern 3

Volumes

↓

Persistent Storage

---

## Pattern 4

Host → Container

```
Outside

↓

Inside
```

Represented by:

```bash
-v host:container
```

---

# Difference Between Images, Containers, and Volumes

| Component | Purpose                                      |
| --------- | -------------------------------------------- |
| Image     | Blueprint used to create containers          |
| Container | Running instance of an Image                 |
| Volume    | Persistent storage shared between containers |

---

# Why Volumes Exist

Volumes should be used for:

- Databases
- Uploaded files
- Logs
- Configuration
- User-generated content
- Application state

These types of data must survive container recreation.

---

# Commands Used

```bash
docker volume ls

docker volume create my-notes

docker run -it \
-v my-notes:/notes \
ubuntu \
bash

pwd

cd /notes

touch forever.txt

cat > forever.txt

cat forever.txt

docker ps -a

docker rm <container-id>
```

---

# Reflection

This checkpoint taught me one of the most important concepts in Docker.

Initially, I assumed files created inside containers would naturally persist.

Through experimentation, I discovered that containers are intentionally temporary.

Deleting a container deletes everything stored inside it.

Docker Volumes solve this by storing important data outside containers while still allowing containers to access that data.

This also reinforced another engineering principle:

Applications are temporary.

Data is permanent.

Separating code from data makes systems easier to rebuild, update, and maintain.

This checkpoint also showed that Docker commands are not random syntax.

Each part of the command has a specific responsibility and contributes to the overall architecture.
