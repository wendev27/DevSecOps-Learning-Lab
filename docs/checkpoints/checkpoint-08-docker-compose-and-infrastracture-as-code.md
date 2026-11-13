Main objective

Understand how Docker Compose orchestrates multiple containers using declarative configuration files.

The question we answered

Before Compose, we had to manually run:

docker network create ...

docker volume create ...

docker run ...

docker run ...

We asked:

"How can we start an entire application stack without running every command manually?"

Docker Compose answered:

"Describe your infrastructure in a file and let Docker build it."

New concepts introduced
Infrastructure as Code (IaC)

Instead of manually creating infrastructure:

docker run ...
docker network create ...
docker volume create ...

we define it as code:

services:
webserver:
image: nginx
ports: - "8080:80"
compose.yaml

Acts as:

Blueprint of the entire city

It describes:

Services
Networks
Volumes
Ports
Relationships
docker compose up

Docker automatically:

✅ Reads the configuration.

✅ Pulls images.

✅ Creates containers.

✅ Creates networks.

✅ Configures DNS.

✅ Configures ports.

✅ Starts the infrastructure.

docker compose up -d

Runs the infrastructure:

Detached

without occupying the terminal.

docker compose down

Stops and removes:

Compose containers
Compose networks
Compose DNS entries
Mental model

Manual Docker:

Engineer manually builds city.

Docker Compose:

Engineer writes city blueprint.
Docker builds city automatically.
Biggest realization

Compose is not a new technology.

It is:

Images

- Containers
- Volumes
- Networks
- Ports
- Configuration

organized into one file.
