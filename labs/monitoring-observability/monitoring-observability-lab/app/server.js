const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  console.log(`[INFO] Home route accessed`);

  res.json({
    message: 'Monitoring Lab',
  });
});

app.get('/health', (req, res) => {
  console.log(`[HEALTH] Health check requested`);

  res.json({
    status: 'healthy',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
