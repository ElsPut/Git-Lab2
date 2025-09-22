const express = require('express');
const app = express();
const cors = require('cors');

// insecure: allows all origins
app.use(cors());

const { exec } = require('child_process');

// insecure: executes arbitrary command from query string
app.get('/ping', (req, res) => {
  const host = req.query.host;
  exec(`ping -c 1 ${host}`, (err, stdout, stderr) => {
    if (err) {
      res.status(500).send(`Error: ${stderr}`);
      return;
    }
    res.send(`Output: ${stdout}`);
  });
});

// insecure: uses a default password if env var missing
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

app.get('/admin', (req, res) => {
  const pw = req.query.pw;
  if (pw === ADMIN_PASSWORD) {
    res.send('Welcome admin');
  } else {
    res.status(401).send('Unauthorized');
  }
});

// verbose error (debug) enabled in production
app.get('/', (req, res) => {
  throw new Error('detailed error info: stack trace...');
});

app.listen(process.env.PORT || 8080);
