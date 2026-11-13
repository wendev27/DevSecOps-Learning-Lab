# Checkpoint 22 — Databases & Caching Foundations

## 🎯 Objective

Understand how modern applications store, persist, modify, back up, and cache data using PostgreSQL and Redis inside Docker containers.

Learn the differences between relational databases and in-memory caching systems while building a strong mental model of how production systems manage data.

---

## 📚 Topics Covered

- PostgreSQL in Docker
- Docker volumes and persistence
- CRUD operations in PostgreSQL
- SQL fundamentals
- Database schema design
- Database migrations (conceptually)
- Database backups and recovery
- Redis fundamentals
- Redis data structures
- Redis caching
- Time To Live (TTL)

---

## 🤔 Questions Explored

- Why use PostgreSQL inside Docker?
- What problem do Docker volumes solve?
- Why does data survive container deletion?
- What is the difference between schema and data?
- How do database migrations work?
- How does Laravel's `php artisan migrate` work internally?
- Why are backups necessary even when using volumes?
- Why is Redis significantly faster than PostgreSQL?
- How does caching reduce database load?
- How do applications implement sessions, OTPs, and expiration systems?

---

## 🔬 Labs and Experiments

### PostgreSQL Lab

- Ran PostgreSQL inside Docker.
- Resolved a port conflict with the local PostgreSQL installation.
- Connected to PostgreSQL using `psql`.
- Created tables manually.
- Performed CRUD operations.
- Explored Docker volumes and persistence.

### Database Migrations

- Created migration files:

```text
migrations/
├── 001_create_users.sql
├── 002_create_tasks.sql
└── 003_add_phone_to_users.sql
```

- Simulated Laravel migrations manually.
- Applied migrations in sequence.
- Explored schema evolution.

### Database Backups

- Exported the database using:

```bash
docker exec postgres-lab pg_dump -U admin devsecops_lab > backup.sql
```

- Examined the generated SQL backup.
- Simulated accidental data loss.
- Discussed backup security and encryption.

### Redis Lab

- Started Redis in Docker.
- Connected using `redis-cli`.
- Practiced Redis commands:

```redis
SET
GET
INCR
TTL
EXPIRE
LPUSH
LRANGE
SADD
SMEMBERS
HSET
HGETALL
KEYS
```

- Built a mental model for caching.

---

## 🧠 Key Concepts

### PostgreSQL

```text
Persistent storage
Disk-based
Relational
Source of truth
```

### Redis

```text
In-memory
Extremely fast
Key-value store
Temporary storage
Cache layer
```

### Cache Flow

```text
User
  ↓
Backend
  ↓
Redis
  ↓
PostgreSQL
```

### Docker Volume Persistence

```text
Container ❌
Volume ✅
```

### Common Redis Use Cases

- Sessions
- OTP codes
- Rate limiting
- Notifications
- Caching
- Password reset links
- Queues

---

## 💭 Reflection

This checkpoint revealed that many features provided by frameworks such as Laravel are abstractions built on top of databases, caching systems, and infrastructure.

Concepts that once felt magical—such as migrations, sessions, expiration timers, and caching—became easier to understand after exploring PostgreSQL and Redis directly.

A major realization was that Redis does not replace PostgreSQL. Instead, Redis reduces unnecessary work by storing frequently accessed data in memory and allowing applications to avoid repeating expensive database operations.

---

## 🚀 Next Checkpoint

- Monitoring and Observability
- Logs
- Metrics
- Health checks
- Prometheus
- Grafana
- Dashboards
