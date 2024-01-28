import { X509Certificate } from 'node:crypto'
import * as utils from './src/utils.js'

if (process.argv.length < 3 || !["sandbox", "production"].includes(process.argv[2])) {
    console.log("Você deve ao menos informar o ambiente (sandbox ou production)");
    console.log("node index.js <environment>");
    console.log("Ex: node index.js sandbox");
    process.exit(1);
}

const environment = process.argv[2];
const directoryCertificatesUrl = environment == "sandbox" ? "https://data.sandbox.directory.openbankingbrasil.org.br/roots_directory.jwks" : "https://data.directory.openbankingbrasil.org.br/roots.jwks";

const certs = [];

const res = await fetch(directoryCertificatesUrl);
const jwks = await res.json();

jwks.keys.forEach(key => {
    key.x5c.forEach(x5cCert => {
        const cert = new X509Certificate(Buffer.from(x5cCert, 'base64'));
        if (environment === 'sandbox' || utils.isBrcacCA(cert)) {
            certs.push(cert);
        }
    })
});

await utils.createCerts(certs);
