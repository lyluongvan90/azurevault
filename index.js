const express = require('express')
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const app = express()
const port = 3000

const credential = new DefaultAzureCredential();

const vaultName = "your-azure-key-vault";
const url = `https://${vaultName}.vault.azure.net`;

const client = new SecretClient(url, credential);

const secretName = "MySecretName";

app.get('/secret', async (req, res) => {
    const result = await client.getSecret(secretName);
    console.log("result: ", result);
})

app.post('/secret', async (req, res) => {
    const result = await client.setSecret(secretName, "MySecretValue");
    console.log("result: ", result);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})