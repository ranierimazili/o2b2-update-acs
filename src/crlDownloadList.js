//Lista de Common Names e URL's de downlaod do CRL
//Lista atualizada em 30/12/2024 com as AC's suportadas pelo ecossistema
export const crlDownloadAddresses = {
    'Autoridade Certificadora Raiz Brasileira v10': "http://acraiz.icpbrasil.gov.br/LCRacraizv10.crl",
    'Autoridade Certificadora do SERPRO SSLv1': "https://repositorio.serpro.gov.br/lcr/acserprosslv1.crl",
    'AC SERASA SSL EV V2': "http://www.certificadodigital.com.br/repositorio/lcr/serasasslevv10-2.crl",
    'AC SERASA SSL EV V3': "http://www.certificadodigital.com.br/repositorio/lcr/serasasslevv10-3.crl",
    'AC SERASA SSL EV V4': "http://www.certificadodigital.com.br/repositorio/lcr/serasasslevv10-4.crl",
    'AC SOLUTI SSL EV G3': "http://ccd.acsoluti.com.br/lcr/ac-soluti-ssl-ev-v10-g3.crl",
    'AC SOLUTI SSL EV G4': "http://ccd.acsoluti.com.br/lcr/ac-soluti-ssl-ev-v10-g4.crl",
    'AC Certisign ICP-Brasil SSL EV G3': "http://icp-brasil.certisign.com.br/repositorio/lcr/ACCertisignICPBRSSLEVG3/LatestCRL.crl",
    'AC Certisign ICP-Brasil SSL EV G4': "http://icp-brasil.certisign.com.br/repositorio/lcr/ACCertisignICPBRSSLEVG4/LatestCRL.crl",
    'AC VALID SSL EV': "https://cdn.shopify.com/s/files/1/0597/2190/8384/files/lcr-ac-validsslev_3.crl?v=1683327454",
}

//Porque certificados V10 não colocam nas extensões seu correto endereço de CRL e colocam todos o http://acraiz.icpbrasil.gov.br/LCRacraizv10.crl
//sendo que nessa URL não ficam todas as revogações?