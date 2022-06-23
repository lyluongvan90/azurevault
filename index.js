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
const databaseKey = "database";
const databaseValue = `{
	"host": "xxxx",
	"port": "xxxx",
	"database": "xxxx",
	"username": "xxxx",
	"password": "xxx"
}`;
// recaptcha key
const reCaptchaKey = "recaptcha";
const reCaptchaValue = `{
	"sitekey": "xxx",
	"secret": "xxxx"
}`;
// redis
const redisKey = "redis";
const redisValue = `{
	"host": "xxxx",
	"port": "xxxx"
}`;
// mail
const mailKey = "mail";
const mailValue = `{
	"host": "xxxx",
	"port": "xxxx"
}`;

app.get('/secret', async (req, res) => {
    const database = await client.getSecret(databaseKey);
    const recaptcha = await client.getSecret(reCaptchaKey);
    const redis = await client.getSecret(redisKey);
    const mail = await client.getSecret(mailKey);
    return res.send({
        action: 'get secret',
        database,
        recaptcha,
        redis,
        mail
    });
})

app.post('/secret', async (req, res) => {
    const database = await client.setSecret(databaseKey, databaseValue);
    const recaptcha = await client.setSecret(reCaptchaKey, reCaptchaValue);
    const redis = await client.setSecret(redisKey, redisValue);
    const mail = await client.setSecret(mailKey, mailValue);
    return res.send({
        action: 'set secret',
        database,
        recaptcha,
        redis,
        mail
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})