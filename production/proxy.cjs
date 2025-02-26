const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

// Load environment variables
const RULES_SERVICE_URL = process.env.RULES_SERVICE_URL;
const REPORTS_SERVICE_URL = process.env.REPORTS_SERVICE_URL;

if (!RULES_SERVICE_URL || !REPORTS_SERVICE_URL) {
  console.error('Please set the RULES_SERVICE_URL and REPORTS_SERVICE_URL environment variables.');
  process.exit(1);
}

const app = express();

// Serve static files from the "build" folder
app.use(express.static(path.join(__dirname, 'build')));

// Proxy requests to the rules service
app.use(
  '/rules-api',
  createProxyMiddleware({
    target: RULES_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/rules-api': '' }, // Remove the "/rules-api" prefix
  })
);

// Proxy requests to the reports service
app.use(
  '/reports-api',
  createProxyMiddleware({
    target: REPORTS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/reports-api': '' }, // Remove the "/reports-api" prefix
  })
);

// Handle all other routes by serving the front-end app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


