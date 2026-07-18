# Checkpoint 21: PostgreSQL Persistence and Docker Volumes

## 🎯 Objective

Understand how PostgreSQL databases run inside Docker containers and explore how Docker volumes preserve data even after containers are stopped or removed.

---

## 📚 Topics Covered

- PostgreSQL in Docker
- SQL CRUD operations
- Docker volumes
- Data persistence
- Docker Compose
- PostgreSQL CLI (`psql`)
- Container lifecycle

---

## 🤔 Questions Explored

- How can PostgreSQL run inside a Docker container?
- Where does PostgreSQL store its data?
- What happens when a PostgreSQL container is removed?
- Why does the database survive container recreation?
- What is the difference between a container and a volume?
- Why do production systems separate applications from data storage?

---

## 🔬 Labs and Experiments

### Lab 1: Running PostgreSQL in Docker

- Created a PostgreSQL container using Docker Compose.
- Configured environment variables:
  - `POSTGRES_USER`
  - `POSTGRES_PASSWORD`
  - `POSTGRES_DB`
- Exposed PostgreSQL through Docker ports.

### Lab 2: Connecting to PostgreSQL

Connected to PostgreSQL using:

```bash
docker exec -it postgres-lab psql -U admin -d devsecops_lab
```

---

### Lab 3: SQL CRUD Operations

Practiced basic SQL operations:

- CREATE
- INSERT
- SELECT
- UPDATE
- DELETE

Example table:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### Lab 4: Testing Persistence

- Stopped the PostgreSQL container.
- Removed the container.
- Recreated the container using Docker Compose.
- Verified that all database records still existed.

---

## 🧠 Key Concepts

### Containers Are Ephemeral

Containers can be stopped, deleted, and recreated at any time.

---

### Volumes Persist Data

Docker volumes exist independently of containers and preserve important data.

---

### PostgreSQL Requires Persistent Storage

Unlike stateless applications, databases must retain information even after restarts.

---

### Separation of Responsibilities

```text
Container → Runs the application

Volume → Stores the data
```

---

## 💭 Reflection

This checkpoint helped me understand that databases and applications have different responsibilities inside modern infrastructure.

Before this lab, deleting a container felt like deleting everything. Through experimentation, I learned that Docker volumes protect database data from container removal.

Working directly with PostgreSQL inside Docker also reinforced SQL fundamentals and showed how production systems manage persistent storage.

---

## 🚀 Next Checkpoint

- Redis fundamentals
- Caching concepts
- Cache hits and cache misses
- Time-to-live (TTL)
- Cache stampede
- Performance optimization
