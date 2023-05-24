const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');

const app = express();

const apiProxy = createProxyMiddleware({
  target: 'http://localhost:5000/api/v1/adsm/',
  changeOrigin: true,
  pathRewrite(path) {
    return path.replace('AUTHNZ', 'autnN');
  },
});

app.use('*', apiProxy);

app.listen(3001);
