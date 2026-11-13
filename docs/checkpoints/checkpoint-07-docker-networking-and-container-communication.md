Checkpoint 07 — Docker Networking & Container Communication
Objective

Understand how Docker containers communicate with each other through custom networks, internal DNS, and private IP addresses.

This checkpoint explores how Docker creates isolated environments while still allowing containers to discover and communicate with one another.

Why this checkpoint matters

Before this lab, Docker containers looked like independent black boxes.

After this checkpoint, we learned that Docker automatically provides:

Private networks
Internal IP addresses
DNS resolution
Service discovery
Container-to-container communication

This is one of the foundations of:

Docker Compose
Microservices
Kubernetes
DevOps
Cloud Infrastructure
Main Question

We asked:

If containers are isolated, how can they talk to each other?

We expected that containers would not have IP addresses until we manually configured them.

The experiment proved otherwise.

Docker automatically assigns private IP addresses and maintains an internal DNS server.

Step 1 — Create a Docker Network

Create a custom network:

docker network create dev-city

List available networks:

docker network ls

Example:

NETWORK ID NAME DRIVER
xxxxxxxxxxxx dev-city bridge
Step 2 — Create Containers

Create house-a:

docker run -dit \
 --name house-a \
 --network dev-city \
 ubuntu \
 bash

Create house-b:

docker run -dit \
 --name house-b \
 --network dev-city \
 ubuntu \
 bash
Question We Asked

Why are we creating two houses?

Mental model:

Docker Network = Neighborhood

Containers = Houses

We wanted to discover whether the houses could communicate.

Step 3 — View Running Containers
docker ps

Example:

CONTAINER ID IMAGE STATUS NAMES

7af5eeadd417 ubuntu Up house-a

6a6efe733e65 ubuntu Up house-b
Step 4 — Inspect Container Information

Inspect the containers:

docker inspect house-a
docker inspect house-b

We searched for:

"NetworkSettings"

and discovered:

"IPAddress": "172.18.0.2"

and:

"IPAddress": "172.18.0.3"
Big Discovery

Docker automatically assigned:

house-a → 172.18.0.2

house-b → 172.18.0.3

without us manually configuring:

DNS
Routers
IP addresses
/etc/hosts
Question We Asked

Your prediction:

"house-b doesn't have an IP yet."

After the experiment:

Docker automatically gives containers IP addresses when they join a network.

Step 5 — Install ping

The Ubuntu image did not contain ping.

Install it:

apt update

apt install -y iputils-ping
Step 6 — Test Communication

Inside house-b:

ping house-a

Output:

PING house-a (172.18.0.2)

64 bytes from house-a.dev-city
Biggest Discovery of the Lab

We expected:

ping 172.18.0.2

But Docker allowed:

ping house-a

Docker translated:

house-a

↓

172.18.0.2

This means Docker provides its own internal DNS.

Docker DNS

Docker automatically creates:

house-a → 172.18.0.2

house-b → 172.18.0.3

This feature is called:

Service Discovery
Questions We Asked During the Lab
Question 1

"Why do we ping house-b if it doesn't have an IP?"

Answer:

Docker automatically assigns private IP addresses.

Question 2

"Why doesn't ping exist?"

Answer:

Docker images are intentionally minimal and contain only essential software.

Question 3

"Can Docker containers communicate by name?"

Answer:

Yes.

Docker automatically provides DNS resolution.

Question 4

"Why use service names instead of IP addresses?"

Example:

Bad:

DATABASE_URL=postgres://172.18.0.3:5432

Good:

DATABASE_URL=postgres://postgres:5432

Reason:

IP addresses may change.

Service names remain stable.

Question 5

"Does this connect to my networking and security lessons?"

Answer:

Yes.

This checkpoint connects directly to:

Ports
Firewalls
Suricata
Routing
DNS
Kubernetes
Reverse proxies
Cloud infrastructure
Mental Models We Built
Docker Network
Neighborhood
Container
House
Port
Door
Docker DNS
Address Book
Docker Compose
City Blueprint
Connection to Docker Compose

Without Compose:

docker network create smartflood-network

docker run ...

docker run ...

docker run ...

With Compose:

services:
frontend:

backend:

postgres:

Docker automatically creates:

Networks
Containers
DNS entries
Port mappings
Volumes
Commands Learned
docker network create dev-city

docker network ls

docker run -dit \
 --name house-a \
 --network dev-city \
 ubuntu \
 bash

docker run -dit \
 --name house-b \
 --network dev-city \
 ubuntu \
 bash

docker ps

docker inspect house-a

docker inspect house-b

docker attach house-a

docker attach house-b

apt update

apt install -y iputils-ping

ping house-a

ping house-b
Biggest Lesson

Docker networking is not magic.

Docker quietly handles:

IP assignment
DNS
Routing
Service discovery

This checkpoint is the bridge between:

Containers

↓

Networking

↓

Docker Compose

↓

Microservices

↓

Kubernetes

↓

DevOps

# Questions asked

"How can isolated containers communicate?"
"Why does Docker assign IP addresses automatically?"
"Why can containers use names instead of IP addresses?"
"How does this relate to networking and Suricata?"
"What problem is Docker Compose trying to solve?"
