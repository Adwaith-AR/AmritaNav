const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync, spawn } = require('child_process');

const HTTP_PORT = 8080;
const HTTPS_PORT = 8443;
const ROOT = __dirname;
const ENABLE_TUNNEL = !process.argv.includes('--no-tunnel');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.webp': 'image/webp'
};

function serveFile(req, res) {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const filePath = path.join(ROOT, reqPath);
  const clientIp = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const proto = req.socket.encrypted ? 'HTTPS' : 'HTTP';

  // Security: prevent directory traversal
  if (!filePath.startsWith(ROOT)) {
    console.warn(`[${proto}] 403 Forbidden: ${reqPath} from ${clientIp}`);
    res.writeHead(403);
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      console.warn(`[${proto}] 404 Not Found: ${reqPath} from ${clientIp}`);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    console.log(`[${proto}] 200 OK: ${reqPath} to ${clientIp}`);
    fs.createReadStream(filePath).pipe(res);
  });
}

function getLocalIps() {
  const nets = os.networkInterfaces();
  const found = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        found.push({ name, address: net.address });
      }
    }
  }

  found.sort((a, b) => {
    const aPri = /^(en0|wlan0|eth0)/.test(a.name) ? 0 : 1;
    const bPri = /^(en0|wlan0|eth0)/.test(b.name) ? 0 : 1;
    return aPri - bPri;
  });

  return found;
}

const localIps = getLocalIps();
const primaryIp = localIps.length > 0 ? localIps[0].address : 'localhost';

function ensureCertificates() {
  const keyPath = path.join(ROOT, 'server.key');
  const certPath = path.join(ROOT, 'server.cert');

  const sanEntries = ['DNS:localhost', 'IP:127.0.0.1'];
  for (const item of localIps) {
    if (!sanEntries.includes(`IP:${item.address}`)) {
      sanEntries.push(`IP:${item.address}`);
    }
  }
  const sanString = sanEntries.join(',');

  let needsGeneration = true;

  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    try {
      const certText = execSync(`openssl x509 -in "${certPath}" -text -noout`, {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'ignore']
      });

      const allIpsPresent = localIps.every(item =>
        certText.includes(`IP Address:${item.address}`) || certText.includes(`IP:${item.address}`)
      );

      execSync(`openssl x509 -checkend 86400 -in "${certPath}"`, { stdio: 'ignore' });

      if (allIpsPresent) {
        needsGeneration = false;
      } else {
        console.log(`[SSL] Network IP changed. Updating certificate to match current IP (${primaryIp})...`);
      }
    } catch (e) {
      console.log('[SSL] Existing certificate invalid or expired. Regenerating...');
      needsGeneration = true;
    }
  }

  if (needsGeneration) {
    console.log(`[SSL] Generating SSL certificate for ${sanString}...`);
    try {
      if (fs.existsSync(keyPath)) fs.unlinkSync(keyPath);
      if (fs.existsSync(certPath)) fs.unlinkSync(certPath);

      execSync(
        `openssl req -x509 -newkey rsa:2048 -nodes -keyout "${keyPath}" -out "${certPath}" -days 365 -subj "/CN=${primaryIp}" -addext "subjectAltName=${sanString}"`,
        { stdio: 'pipe' }
      );
      console.log('[SSL] Certificate generated successfully with Subject Alternative Names.');
    } catch (err) {
      console.warn('[SSL] Falling back to basic certificate:', err.message);
      execSync(
        `openssl req -x509 -newkey rsa:2048 -nodes -keyout "${keyPath}" -out "${certPath}" -days 365 -subj "/CN=${primaryIp}"`,
        { stdio: 'pipe' }
      );
    }
  }

  return { keyPath, certPath };
}

function startTunnel(port) {
  const binaryCandidates = [
    path.join(ROOT, 'tools', 'cloudflared'),
    path.join(ROOT, 'cloudflared'),
    'cloudflared'
  ];

  let binary = binaryCandidates.find(p => fs.existsSync(p));
  if (!binary) binary = 'cloudflared';

  console.log('\n[Tunnel] Launching Cloudflare public tunnel for mobile access...');
  const tunnel = spawn(binary, ['tunnel', '--url', `http://localhost:${port}`]);

  let tunnelFound = false;

  function handleData(data) {
    const text = data.toString();
    const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
    if (match && !tunnelFound) {
      tunnelFound = true;
      const url = match[0];
      console.log('\n' + '='.repeat(64));
      console.log('🚀 PUBLIC MOBILE TUNNEL READY (RECOMMENDED):');
      console.log(`👉 ${url}`);
      console.log('='.repeat(64));
      console.log('  • Works on ANY network (Wi-Fi, 4G, 5G)');
      console.log('  • Trusted Cloudflare SSL (no certificate warnings)');
      console.log('  • Full GPS & Geolocation tracking enabled');
      console.log('='.repeat(64) + '\n');
    }
  }

  tunnel.stdout.on('data', handleData);
  tunnel.stderr.on('data', handleData);

  tunnel.on('error', (err) => {
    console.warn('[Tunnel] Could not start cloudflared:', err.message);
  });

  const cleanup = () => {
    try {
      tunnel.kill();
    } catch (e) {}
  };

  process.on('exit', cleanup);
  process.on('SIGINT', () => {
    cleanup();
    process.exit();
  });
  process.on('SIGTERM', () => {
    cleanup();
    process.exit();
  });
}

// Start HTTP Server
const httpServer = http.createServer(serveFile);
httpServer.listen(HTTP_PORT, '0.0.0.0', () => {
  console.log('='.repeat(60));
  console.log('Classroom Locator Server Started');
  console.log('='.repeat(60));
  console.log(`\n[Local Network Access]`);
  console.log(`  Local:   http://localhost:${HTTP_PORT}`);
  for (const item of localIps) {
    console.log(`  Mobile (${item.name}): http://${item.address}:${HTTP_PORT}`);
  }

  if (ENABLE_TUNNEL) {
    startTunnel(HTTP_PORT);
  }
});

// Start HTTPS Server (Local Wi-Fi fallback)
try {
  const { keyPath, certPath } = ensureCertificates();
  const key = fs.readFileSync(keyPath);
  const cert = fs.readFileSync(certPath);
  const httpsServer = https.createServer({ key, cert }, serveFile);

  httpsServer.listen(HTTPS_PORT, '0.0.0.0', () => {
    console.log(`\n[Local Wi-Fi HTTPS] (Fallback if tunnel is disabled)`);
    console.log(`  Local:   https://localhost:${HTTPS_PORT}`);
    for (const item of localIps) {
      console.log(`  Mobile (${item.name}): https://${item.address}:${HTTPS_PORT}`);
    }
  });
} catch (e) {
  console.error('[HTTPS Server Error]:', e.message);
}
