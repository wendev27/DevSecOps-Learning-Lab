# 🛡️ OWASP Practice — Preventing SQL Injection

## 🎯 Objective

Understand how SQL Injection vulnerabilities occur and how secure coding practices prevent attackers from manipulating database queries.

---

# ❌ Vulnerable Code

CodeQL detected a SQL Injection vulnerability in the following code:

```javascript
const express = require('express');
const app = express();

app.get('/search', (req, res) => {
  const query = req.query.q;

  const sql = `SELECT * FROM users WHERE name = '${query}'`;

  console.log(sql);

  res.send(sql);
});

app.listen(3000);
```

---

## 🚨 Why is this dangerous?

The application directly inserts user input into the SQL query:

```javascript
const sql = `SELECT * FROM users WHERE name = '${query}'`;
```

An attacker could send:

```text
/search?q=' OR '1'='1
```

The SQL query becomes:

```sql
SELECT * FROM users WHERE name = '' OR '1'='1'
```

This could allow attackers to:

- Read unauthorized data
- Bypass application logic
- Modify or delete records
- Compromise the database

---

# 🔍 Security Tool Detection

The vulnerability was detected by:

- ✅ CodeQL
- ✅ Semgrep

Because the repository uses branch protection rules and required status checks, security findings can block merges and deployments.

---

# ✅ Secure Code (Parameterized Query)

Using parameterized queries prevents SQL Injection attacks.

```javascript
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb',
});

app.get('/search', async (req, res) => {
  const query = req.query.q;

  const [rows] = await db.execute('SELECT * FROM users WHERE name = ?', [
    query,
  ]);

  res.json(rows);
});

app.listen(3000);
```

---

# 🧠 What Changed?

### ❌ Vulnerable Approach

```javascript
const sql = `SELECT * FROM users WHERE name = '${query}'`;
```

The developer manually constructs the SQL query and directly inserts user input.

---

### ✅ Secure Approach

```javascript
db.execute('SELECT * FROM users WHERE name = ?', [query]);
```

The query and the user input are sent separately.

The database engine safely escapes the input before executing the query.

---

# 🏗️ Behind the Scenes

The database receives:

### SQL Template

```sql
SELECT * FROM users WHERE name = ?
```

### User Input

```text
Mark
```

Because the database handles the parameter separately, malicious SQL code cannot change the query structure.

---

# 📚 OWASP Category

This vulnerability belongs to:

- OWASP Top 10 — Injection

---

# 💡 Key Takeaway

Modern ORMs and database libraries help prevent SQL Injection by using parameterized queries.

Examples:

- Prisma
- Supabase
- Mongoose
- Entity Framework
- Laravel Eloquent

Secure applications should never build SQL queries by directly concatenating user input.
