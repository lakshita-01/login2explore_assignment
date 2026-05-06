const http = require('http');
const fs = require('fs');
const path = require('path');
const dotenvPath = path.join(__dirname, '.env');
if (fs.existsSync(dotenvPath)) {
  fs.readFileSync(dotenvPath, 'utf8').split('\n').forEach(line => {
    const [key, val] = line.split('=');
    if (key && val) process.env[key.trim()] = val.trim();
  });
}

const PORT      = 8000;
const JPDB_HOST = 'api.login2explore.com';
const JPDB_PORT = 5577;
const TOKEN      = process.env.JPDB_TOKEN;
const USER_TOKEN = process.env.JPDB_USER_TOKEN;

if (!TOKEN || !USER_TOKEN) {
  console.error('ERROR: JPDB_TOKEN and JPDB_USER_TOKEN must be set in .env');
  process.exit(1);
}

const server = http.createServer((req, res) => {

  // Serve HTML
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Error loading index.html');
      }
      const html = data
        .replace('__TOKEN__', TOKEN)
        .replace('__USER_TOKEN__', USER_TOKEN);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(html);
    });
    return;
  }

  // Proxy API
  if (req.method === 'POST' && req.url.startsWith('/api/')) {

    let body = '';
    req.on('data', chunk => body += chunk);

    req.on('end', () => {
      const options = {
        hostname: JPDB_HOST,
        port: JPDB_PORT,
        path: req.url,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body)
        }
      };

      const proxy = http.request(options, (apiRes) => {
        const responseHeaders = Object.assign({}, apiRes.headers, { 'Access-Control-Allow-Origin': '*' });
        res.writeHead(apiRes.statusCode, responseHeaders);
        apiRes.pipe(res);
      });

      proxy.on('error', (err) => {
        console.error('Proxy error:', err);
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        }
        res.end(JSON.stringify({ error: 'Proxy failed', details: err.message }));
      });

      proxy.write(body);
      proxy.end();
      console.log('[PROXY →JPDB]', body);
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Server running → http://localhost:${PORT}`);
});