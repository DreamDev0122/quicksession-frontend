const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(
    ["/api", "/auth/google", "/v1"],
    createProxyMiddleware({
      target: `http://localhost:5002/`,
      changeOrigin: true,
    })
  );

  server.all("*", (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
