const express = require('express')
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const app = express()
const port = 3000

const credential = new DefaultAzureCredential();

const vaultName = "your-azure-key-vault";
const url = `https://${vaultName}.vault.azure.net`;

const client = new SecretClient(url, credential);

const databaseKey = "database";
const databaseValue = `{
	"host": "xxxx",
	"port": "xxxx",
	"database": "xxxx",
	"username": "xxxx",
	"password": "xxx"
}`;

const reCaptchaKey = "recaptcha";
const reCaptchaValue = `{
	"sitekey": "xxx",
	"secret": "xxxx"
}`;


app.get('/secret', async (req, res) => {
    const database = await client.getSecret(databaseKey);
    const recaptcha = await client.getSecret(reCaptchaKey);
    return res.send({
        action: 'get secret',
        database,
        recaptcha
    });
})

app.post('/secret', async (req, res) => {
    const database = await client.setSecret(databaseKey, databaseValue);
    const recaptcha = await client.setSecret(reCaptchaKey, reCaptchaValue);
    return res.send({
        action: 'set secret',
        database,
        recaptcha
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})