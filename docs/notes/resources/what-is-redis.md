# ⚡ Redis and Caching

## 📖 What is Redis?

Redis is an **in-memory database and cache**.

Unlike PostgreSQL or MongoDB, which save data to disk, Redis primarily stores data in **RAM**.

Think of it like this:

```text
Hard drive / SSD
        ↓
PostgreSQL
MongoDB

RAM
        ↓
Redis
```

Because RAM is much faster than disks, Redis is incredibly fast.

---

# 🤔 Why does Redis exist?

Suppose your application needs to show:

- Current flood level
- Number of active residents
- Latest sensor readings

Every time a user opens the dashboard, the backend asks PostgreSQL:

```text
Backend
    ↓
PostgreSQL
    ↓
"Give me the latest sensor data."
```

Now imagine:

```text
10 users       → easy 😎
1,000 users    → okay 🙂
100,000 users  → database sweating 😰
```

The database keeps executing the same expensive query over and over again.

---

# ⚡ Redis says:

> "Relax. I already have that data."

The flow becomes:

```text
User
    ↓
Backend
    ↓
Redis
    ↓
"Do you already have the sensor data?"
```

---

## If Redis already has the data (Cache Hit)

```text
Redis
    ↓
Returns data instantly ⚡
```

The backend never contacts PostgreSQL.

---

## If Redis does not have the data (Cache Miss)

```text
Redis ❌
    ↓
PostgreSQL
    ↓
Save result into Redis
    ↓
Return data
```

The backend fetches the data from PostgreSQL and stores a temporary copy inside Redis.

---

# 🧠 Example

Suppose the backend stores:

```text
Key:

dashboard_data
```

with this value:

```json
{
  "floodLevel": "Moderate",
  "activeSensors": 42,
  "affectedHouseholds": 183
}
```

and sets an expiration time:

```text
TTL (Time To Live): 300 seconds
```

For the next 5 minutes:

```text
10,000 users
      ↓
Backend
      ↓
Redis ⚡
```

PostgreSQL is not contacted.

After 5 minutes:

```text
Redis automatically deletes the cache ❌
```

The next request will rebuild the cache.

---

# 🔥 Cache Flow

## First request

```text
User
    ↓
Backend
    ↓
Redis ❌
    ↓
PostgreSQL
    ↓
Save to Redis
    ↓
Return data
```

---

## Subsequent requests

```text
User
    ↓
Backend
    ↓
Redis ⚡
    ↓
Return cached data
```

---

# ⏳ Cache Expiration

Redis allows data to expire automatically.

Example:

```text
Save this data for 5 minutes.
```

After:

```text
300 seconds
```

Redis removes the cached data.

The next user request will fetch fresh data from PostgreSQL and recreate the cache.

---

# 🚨 Cache Stampede

A cache stampede happens when cached data expires and many users request the same data at the same time.

Example:

```text
Cache expires ❌

10,000 users arrive simultaneously
        ↓
Redis says:

"I don't have the data."
```

Without protection:

```text
10,000 users
        ↓
10,000 database queries 💀
```

Engineers solve this using techniques such as:

- Cache locking
- Background refresh
- Staggered expiration
- Request queues

---

# 🚀 Common Uses of Redis

Companies use Redis for:

- ⚡ Caching API responses
- 🔑 Session storage
- 📈 Rate limiting
- 🔔 Real-time notifications
- 🛒 Shopping carts
- 🏆 Leaderboards
- 💬 Chat applications
- 📦 Temporary data storage

For example, when GitHub tells you:

```text
"API rate limit exceeded."
```

there is a good chance Redis is involved.

---

# 🧩 Redis vs PostgreSQL

| PostgreSQL              | Redis                    |
| ----------------------- | ------------------------ |
| Stores data permanently | Usually temporary        |
| Stored on disk          | Stored in RAM            |
| Slower                  | Extremely fast           |
| Complex queries         | Simple key-value lookups |
| Source of truth         | Speed booster            |

---

# 🏗️ Full System Architecture

```text
User
    ↓
Backend
    ↓
Redis ⚡
    ↓
PostgreSQL 🗄️
    ↓
Docker Volume 💾
    ↓
Disk
```

Each layer solves a different problem:

- **Redis** → Speed
- **PostgreSQL** → Permanent storage
- **Docker Volume** → Persistence
- **Disk** → Physical storage

---

# 🎯 Key Takeaways

- Redis is an in-memory database and cache.
- Redis stores data in RAM, making it extremely fast.
- Redis reduces database load by caching frequently requested data.
- Cached data is temporary and usually expires after a set time.
- PostgreSQL remains the source of truth.
- Redis improves performance but does not replace databases.
- Modern applications often use PostgreSQL and Redis together.
