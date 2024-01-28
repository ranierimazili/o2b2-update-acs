process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { crlDownloadAddresses } from "./crlDownloadList.js";
import fs from 'fs'

//Todo certificado de aplicação (brcac) é emitido por uma AC subordinada a
//CN=Autoridade Certificadora Raiz Brasileira v10
export const isBrcacCA = function(cert) {
    return cert.issuer.includes("Autoridade Certificadora Raiz Brasileira v10");
}

export const createCerts = async function (certs) {
    const pemCRLs = [];
    const pemCAs = [];

    for (const cert of certs) {
        pemCAs.push(cert.toString());

        const cn = cert.subject.split('\n').filter(e => {return e.startsWith("CN=")})[0].substring(3);
        if (crlDownloadAddresses[cn]) {
            const crl = await downloadCRL(crlDownloadAddresses[cn]);
            const pemCrl = `-----BEGIN X509 CRL-----\n${crl.toString('base64').match(/.{1,64}/g).join('\n')}\n-----END X509 CRL-----\n`;
            pemCRLs.push(pemCrl);
        } else {
            console.warn("WARNING: URL de download do arquivo CRL não encontrado para a AC: ", cert.subject.split('\n').join(','));
        }
    }

    if (pemCAs.length > 0) {
        saveFile(pemCAs.join(""), "./certs/cas.pem");
    }

    if (pemCRLs.length > 0) {
        saveFile(pemCRLs.join(""), "./certs/crls.pem");
    }

}

const saveFile = function(content, filePath) {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        }
    });
}

const downloadCRL = async function(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
    }
    
    const buffer = Buffer.from(await response.arrayBuffer())
    return buffer;
}
