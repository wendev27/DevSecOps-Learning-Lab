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
