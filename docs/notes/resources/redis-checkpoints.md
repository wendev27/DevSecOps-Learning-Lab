🚀 Redis Checkpoint 2: Data Structures

Up until now, Redis has looked like this:

user → "wendev27"
visitors → 101

But Redis can actually store richer data structures.

1. Strings (you already know this)
   SET username "wendev27"
   GET username
2. Lists 📋

Think:

Notifications
─────────────
"Flood warning"
"Evacuation alert"
"Relief arrived"

Try this:

LPUSH notifications "Flood warning"
LPUSH notifications "Evacuation alert"
LPUSH notifications "Relief arrived"

Now inspect the list:

LRANGE notifications 0 -1

You should get:

1. "Relief arrived"
2. "Evacuation alert"
3. "Flood warning"

Mental model:

Redis List

Head ← [item] [item] [item] → Tail

Laravel queues are heavily based on this idea.

3. Sets 🎯

A set stores unique values.

Imagine:

Active barangays

Try:

SADD barangays "Barangay 1"
SADD barangays "Barangay 2"
SADD barangays "Barangay 2"

Now:

SMEMBERS barangays

You'll notice "Barangay 2" appears only once.

Redis automatically removes duplicates.

4. Hashes 🗂️ (the coolest one)

This is where you'll suddenly think:

"Wait... this feels like JSON."

Try:

HSET user:1 username "wendev27"
HSET user:1 email "wendev@example.com"
HSET user:1 role "admin"

Read everything:

HGETALL user:1

Expected:

1. "username"
2. "wendev27"
3. "email"
4. "wendev@example.com"
5. "role"
6. "admin"
   🧠 The mental explosion

Look at this:

PostgreSQL
SELECT \* FROM users WHERE id = 1;
Redis
HGETALL user:1

Redis doesn't have tables. It has keys:

user:1
user:2
user:3

And each key can behave like a tiny object.

# My question asked

How can a database cannot handle a query for 10k users but redis can ?

# Answer

🐘 PostgreSQL: the librarian

Imagine PostgreSQL is a librarian in a giant library.

When a request comes in:

SELECT \* FROM flood_reports
WHERE barangay = 'Malolos';

PostgreSQL has to:

1. Parse the SQL query.
2. Check permissions.
3. Find the table.
4. Read indexes.
5. Access disk.
6. Join tables.
7. Build the result.
8. Return the data.

Even if PostgreSQL is very fast, disk access is still thousands of times slower than RAM.

Roughly:

Storage Approximate latency
CPU Cache ~1 ns
RAM (Redis) ~100 ns
SSD ~100,000 ns
HDD Millions of ns

Redis lives mostly in RAM, while PostgreSQL stores data on disk.

⚡ Redis: the sticky note

Suppose 10,000 users open SmartFlood during a typhoon.

Without Redis:

10,000 users
↓
Backend
↓
PostgreSQL

PostgreSQL receives:

SELECT flood_level
FROM sensors
WHERE city = 'Malolos';

10,000 times.

Even if each query only takes:

5 ms

you suddenly have:

10,000 × 5 ms = 50 seconds of database work

With Redis:

The first request does this:

User #1
↓
PostgreSQL
↓
Store result in Redis (TTL: 60s)

The next 9,999 users do:

User #2
↓
Redis

Redis doesn't parse SQL. It doesn't join tables. It doesn't read from disk.

It just does:

"flood:malolos" → "ALERT_LEVEL_3"

That operation is incredibly cheap.

The important realization

The point of Redis is not:

"PostgreSQL is weak."

The point is:

"Don't ask PostgreSQL to do the same expensive work 10,000 times."

In fact, PostgreSQL is usually the source of truth:

PostgreSQL = permanent truth

Redis = temporary memory
