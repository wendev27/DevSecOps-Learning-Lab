const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello from the backend API 🔥');
});

server.listen(4000, () => {
  console.log('Backend running on port 4000');
});
