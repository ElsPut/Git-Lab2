const express = require('express');
const app = express();
const cors = require('cors');

// insecure: allows all origins
app.use(cors({ origin: "https://sslab-webappels.azurewebsites.net/" }));


// insecure: uses a default password if env var missing


const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const credential = new DefaultAzureCredential();
const vaultName = process.env.KEYVAULT_NAME;
const url = `https://${vaultName}.vault.azure.net`;
const client = new SecretClient(url, credential);

async function getAdminPassword() {
  const secret = await client.getSecret("ADMIN-PASSWORD");
  return secret.value;
}


app.get('/admin', async (req, res) => {
  try {
    const ADMIN_PASSWORD = await getAdminPassword();

    if (req.query.pw === ADMIN_PASSWORD) {
      res.send("Welcome admin");
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    console.error("Key Vault error:", err);
    res.status(500).send("Error retrieving admin password");
  }
});


 app.get('/', (req, res) => {
   res.send('App is running securely 🎉');
 });


// verbose error (debug) enabled in production
// app.use((err, req, res, next) => {
//  console.error(err); // log internally
//  res.status(500).send("Something went wrong");
// });


app.listen(process.env.PORT || 8080);
