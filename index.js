import { X509Certificate } from 'node:crypto'
import * as utils from './src/utils.js'
import { remove as removeDiacritics } from 'diacritics';
import forge from 'node-forge';
import { ASN1 } from '@lapo/asn1js';

if (process.argv.length < 3 || !["sandbox", "production"].includes(process.argv[2])) {
    console.log("Você deve ao menos informar o ambiente (sandbox ou production)");
    console.log("node index.js <environment>");
    console.log("Ex: node index.js sandbox");
    process.exit(1);
}

/*function formatCRLDistributionPoints(extension) {
    var distributionPoints = ASN1.decode(byteStringToBytes(extension.value));
    var output = [];
    for (var i = 0; i < distributionPoints.sub.length; i++) {
        var distributionPointData = distributionPoints.sub[i];
        var distributionPoint = distributionPointData.sub[0];
        for (var j = 0; j < distributionPoint.sub[0].sub.length; j++) {
            var name = distributionPoint.sub[0].sub[j];
            output.push(name.content().split('\n')[1]);
        }
    }
    return output;
}

function byteStringToBytes(byteString) {
    var bytes = [];
    for (var i = 0; i < byteString.length; i++) {
        bytes.push(byteString.charCodeAt(i));
    }
    return bytes;
}

function getCrlUrlFromCertificate(certPem) {
    const cert = forge.pki.certificateFromPem(certPem);
    console.log("extensions", cert.extensions);
    const crlExtension = cert.extensions.find((ext) => ext.name === "cRLDistributionPoints");
  
    if (!crlExtension) {
      throw new Error("Extensão cRLDistributionPoints não encontrada no certificado.");
    }
    
    //console.log(formatCRLDistributionPoints(crlExtension));
    var distributionPoints = ASN1.decode(byteStringToBytes(crlExtension.value));
    var output = [];
    for (var i = 0; i < distributionPoints.sub.length; i++) {
        var distributionPointData = distributionPoints.sub[i];
        var distributionPoint = distributionPointData.sub[0];
        for (var j = 0; j < distributionPoint.sub[0].sub.length; j++) {
            var name = distributionPoint.sub[0].sub[j];
            output.push(name.content().split('\n')[1]);
        }
    }

    return output;
}*/

const environment = process.argv[2];
const directoryCertificatesUrl = environment == "sandbox" ? "https://data.sandbox.directory.openbankingbrasil.org.br/roots_directory.jwks" : "https://data.directory.openbankingbrasil.org.br/roots.jwks";

const certs = [];

const res = await fetch(directoryCertificatesUrl);
const jwks = await res.json();

utils.cleanCertsFolder();

jwks.keys.forEach(key => {
    key.x5c.forEach(x5cCert => {
        const cert = new X509Certificate(Buffer.from(x5cCert, 'base64'));
        //console.log(cert.toLegacyObject().subject);
        //console.log(getCrlUrlFromCertificate(cert.toString()));
        if (environment === 'sandbox' || utils.isBrcacCA(cert)) {
            //console.log(cert.toLegacyObject().subject);
            //console.log(getCrlUrlFromCertificate(cert.toString()));
            certs.push(cert);
            if (process.argv.includes("--explode")) {
                const certName = removeDiacritics(cert.toLegacyObject().subject.CN).replaceAll(' ', '_') + ".crt";
                utils.saveFile(cert.toString(), "./certs/" + certName);
            }
        }
    })
});

await utils.createCerts(certs, environment);