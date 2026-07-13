# 🌐 Checkpoint 06 — Docker Networking & Port Publishing

> **Goal:** Understand how Docker Containers communicate with the outside world through Port Publishing and why browsers cannot automatically access services running inside containers.

---

# 📅 Date

July 2026

---

# 🎯 Objectives

This checkpoint focused on understanding:

- Linux Networking Basics
- TCP Ports
- Host vs Container Networking
- Docker Port Publishing
- The `-p` flag
- The `-d` flag
- Named Containers
- NGINX as a Web Server
- Why browsers cannot automatically access containers

---

# 🧠 The Problem

I successfully ran an NGINX container.

```bash
docker run nginx
```

The container was running correctly.

However...

Opening my browser showed nothing.

This raised an important question:

> If NGINX is running...
>
> Why can't Chrome see it?

---

# Mental Model

Think of the computer as a building.

```
🏢 Computer

Door 22

Door 80

Door 443

Door 3000

Door 5432
```

Every network service listens on a specific door (Port).

Browsers do not search the computer.

Instead, they knock on a specific door.

Example:

```
http://localhost:3000
```

Means:

```
This Computer

↓

Door 3000
```

---

# The Linux Kernel

One of the biggest discoveries during this checkpoint.

Mental Model:

```
Chrome (Mailman)

↓

Linux Kernel (Receptionist)

↓

Correct Port

↓

Application
```

The Linux Kernel knows which process owns each Port.

When Chrome sends traffic:

```
localhost:3000
```

The Kernel checks:

```
Who owns Port 3000?
```

If someone owns it:

Traffic is delivered.

If nobody owns it:

```
ERR_CONNECTION_REFUSED
```

---

# Ports Are Doors

Examples:

| Port  | Common Service                |
| ----- | ----------------------------- |
| 22    | SSH                           |
| 80    | HTTP                          |
| 443   | HTTPS                         |
| 3000  | React Development Server      |
| 3001  | Express API (Common Practice) |
| 5432  | PostgreSQL                    |
| 6379  | Redis                         |
| 27017 | MongoDB                       |

Ports are simply communication endpoints.

Applications request permission from Linux to listen on a specific port.

If another application already owns that port:

```
EADDRINUSE
```

Meaning:

The Port is already occupied.

---

# Containers Have Their Own Network

One of the biggest architectural discoveries.

Inside a container:

```
NGINX

↓

Port 80
```

Inside the Host:

```
Chrome

↓

Host Port 80
```

These are NOT automatically connected.

Containers have their own isolated networking environment.

---

# Why Chrome Could Not Access NGINX

Architecture:

```
Chrome

↓

Linux Kernel

↓

Host Port 80

❌

Docker

↓

Container Port 80

↓

NGINX
```

The browser only knows about the Host.

It has no knowledge of ports inside containers.

No bridge existed.

---

# Docker Port Publishing

Docker solves this problem using:

```bash
-p
```

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

Exactly the same mental model learned previously with Volumes.

---

# First Published Port

Command:

```bash
docker run -d \
--name webserver \
-p 8080:80 \
nginx
```

---

# Breaking Down the Command

## docker run

Create and start a new container.

---

## -d

Detached Mode.

Instead of occupying the terminal,

Docker runs the container in the background.

This behaves similarly to a Linux service.

---

## --name webserver

Assigns a readable name to the container.

Instead of random names like:

```
loving_keller

gifted_ellis
```

I can now use:

```bash
docker stop webserver

docker start webserver

docker logs webserver
```

---

## -p

Publish a Port.

Mental Model:

```
Outside

↓

Inside
```

Example:

```bash
-p 8080:80
```

Means:

```
Host Port 8080

↓

Container Port 80
```

Docker creates a bridge between them.

---

## nginx

Docker Image used to create the container.

Acts as the Blueprint.

---

# Understanding Docker PS

Output:

```
0.0.0.0:8080->80/tcp
```

Meaning:

```
0.0.0.0

↓

All network interfaces

↓

Host Port 8080

↓

Forward Traffic

↓

Container Port 80

↓

TCP Protocol

↓

NGINX
```

---

# Visualizing Port Publishing

Without Port Publishing:

```
Chrome

↓

Host Port 80

❌

Container Port 80

↓

NGINX
```

No communication.

---

With Port Publishing:

```
Chrome

↓

Host Port 8080

↓

Docker Bridge

↓

Container Port 80

↓

NGINX
```

Communication becomes possible.

---

# Successful Test

Running:

```bash
docker run -d \
--name webserver \
-p 8080:80 \
nginx
```

Opening:

```
http://localhost:8080
```

Displayed:

```
Welcome to nginx!
```

This proved that Docker was successfully forwarding traffic from the Host into the Container.

---

# Relationship Between Volumes and Ports

One of the biggest patterns discovered.

Volumes:

```bash
-v my-notes:/notes
```

Meaning:

```
Outside

↓

Inside
```

Ports:

```bash
-p 8080:80
```

Meaning:

```
Outside

↓

Inside
```

Docker follows a consistent design.

The left side always represents the Host.

The right side always represents the Container.

---

# Engineering Patterns Learned

## Pattern 1

Images

↓

Blueprints

---

## Pattern 2

Containers

↓

Running Instances

---

## Pattern 3

Volumes

↓

Persistent Storage

---

## Pattern 4

Ports

↓

Communication Bridge

---

# Connection to Networking

This checkpoint connected Docker with previous networking knowledge.

The same networking concepts are used by:

- Routers
- Virtual Machines
- Docker
- Kubernetes
- Firewalls
- Reverse Proxies
- Cloud Infrastructure

All rely on forwarding traffic between networks.

---

# Commands Used

```bash
docker pull nginx

docker images

docker run nginx

docker ps

docker run -d \
--name webserver \
-p 8080:80 \
nginx

docker stop webserver

docker start webserver

docker logs webserver
```

---

# Biggest Discoveries

- Containers have their own isolated networking environment.
- Browsers only communicate with the Host operating system.
- Docker must explicitly publish ports before the browser can reach a container.
- Linux keeps track of which process owns each port.
- Port Publishing creates a bridge between Host networking and Container networking.
- Docker follows a consistent "Host → Container" design for both Volumes and Ports.

---

# Reflection

This checkpoint completely changed my understanding of networking inside Docker.

Before this lesson, I believed running a web server inside a container automatically made it accessible through my browser.

Through experimentation, I discovered that containers have isolated networking environments.

The browser communicates only with the Host operating system, while Docker is responsible for forwarding traffic into containers using Port Publishing.

One of the most important mental models developed during this checkpoint was:

```
Outside

↓

Inside
```

This applies consistently to both Docker Volumes and Docker Ports.

I also realized that Docker networking is not a completely new concept.

It builds upon the same networking principles used by Linux, Virtual Machines, Firewalls, Routers, and Kubernetes.

Instead of memorizing commands, I learned to understand the flow of communication between systems.

This checkpoint marks the beginning of understanding modern infrastructure rather than simply learning Docker commands.
