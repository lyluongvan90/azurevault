const express = require('express')
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const app = express()
const port = 3000

const credential = new DefaultAzureCredential();

const vaultName = "your-azure-key-vault";
const url = `https://${vaultName}.vault.azure.net`;

const client = new SecretClient(url, credential);
// database key
const azureKey = "xxxx";
const azureValue = `{
	"database": {
        "host": "xxxx",
        "port": "xxxx",
        "database": "xxxx",
        "username": "xxxx",
        "password": "xxx"
    },
    "recaptcha": {
        "sitekey": "xxx",
        "secret": "xxxx"
    },
    "redis": {
        "host": "xxxx",
        "port": "xxxx"
    },
    "mail": {
        "host": "xxxx",
        "port": "xxxx"
    }
}`;

app.get('/secret', async (req, res) => {
    const azure = await client.getSecret(azureKey);
    return res.send({
        action: 'get secret',
        azure
    });
})

app.post('/secret', async (req, res) => {
    const azure = await client.setSecret(azureKey, azureValue);
    
    return res.send({
        action: 'set secret',
        azure
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})