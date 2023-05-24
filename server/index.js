const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');

const app = express();

const apiProxy = createProxyMiddleware({
  router: (req) => {
    console.log(req.originalUrl);
    if (req.originalUrl.includes('AUTHNZ'))
      return 'http://localhost:5000/api/v1/adsm/';
    return 'http://localhost:5001/araosdevsm/';
  },
  changeOrigin: true,
  pathRewrite(path) {
    return path.replace('AUTHNZ', 'autnN').replace('ADSM', '');
  },
});

app.use('*', apiProxy);

app.listen(3001);
