import { X509Certificate } from 'node:crypto'
import fs from 'fs'

if (process.argv.length < 3 || !["sandbox", "production"].includes(process.argv[2])) {
    console.log("Você deve ao menos informar o ambiente (sandbox ou production)");
    console.log("node index.js <environment> [file_destination]");
    console.log("Ex: node index.js sandbox");
    process.exit(1);
}

const environment = process.argv[2];
const directoryCertificatesUrl = environment == "sandbox" ? "https://data.sandbox.directory.openbankingbrasil.org.br/roots_directory.jwks" : "https://data.directory.openbankingbrasil.org.br/roots.jwks";
const fileDestination = process.argv.length == 4 ? process.argv[3] : null;

const certs = [];

const res = await fetch(directoryCertificatesUrl);
const jwks = await res.json();

jwks.keys.forEach(key => {
    key.x5c.forEach(x5cCert => {
        const cert = new X509Certificate(Buffer.from(x5cCert, 'base64'));
        certs.push(cert.toString());
    })
});

if (fileDestination) {
    fs.writeFile(fileDestination, certs.join(""), (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        }
    });
} else {
    console.log(certs.join(""));
}
