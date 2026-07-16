// vulnerable.js

const express = require('express');
const app = express();

app.get('/search', (req, res) => {
  const query = req.query.q;

  const sql = `SELECT * FROM users WHERE name = '${query}'`;

  console.log(sql);

  res.send(sql);
});

app.listen(3000);
