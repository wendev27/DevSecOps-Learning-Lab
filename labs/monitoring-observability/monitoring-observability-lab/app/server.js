const express = require('express');
const client = require('prom-client');

const app = express();

const PORT = 3000;

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics();

const counter = new client.Counter({
  name: 'home_requests_total',
  help: 'Total requests to the home page',
});

app.get('/', (req, res) => {
  counter.inc();

  console.log('[INFO] Home route accessed');

  res.json({
    message: 'Monitoring Lab',
  });
});

app.get('/health', (req, res) => {
  console.log('[HEALTH] Health check requested');

  res.json({
    status: 'healthy',
  });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);

  res.end(await client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
