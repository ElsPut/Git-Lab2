const express = require('express');
const app = express();
const cors = require('cors');

// insecure: allows all origins
app.use(cors({ origin: "https://sslab-webappels.azurewebsites.net/" }));


// insecure: uses a default password if env var missing
if (!process.env.ADMIN_PASSWORD) {
  throw new Error("Missing ADMIN_PASSWORD");
}

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

app.get('/admin', (req, res) => {
  const pw = req.query.pw;
  if (pw === ADMIN_PASSWORD) {
    res.send('Welcome admin');
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.get('/', (req, res) => {
  res.send('App is running securely 🎉');
});


// verbose error (debug) enabled in production
app.use((err, req, res, next) => {
  console.error(err); // log internally
  res.status(500).send("Something went wrong");
});


app.listen(process.env.PORT || 8080);
