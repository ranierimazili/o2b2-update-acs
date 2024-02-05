# The open Open Banking Brasil project - Update AC's
Atualmente as AC's do Open Finance Brasil estão documentadas em [Padrão de Certificados do Open Finance Brasil](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/82313425/PT+Padr+o+de+Certificados+Open+Finance+Brasil+2.0) e cabe as instituições verificar quais AC's estão homologadas, consultar seus certificados no site do ITI e adicioná-los as suas plataformas para que participantes utilizando os certificados emitidos pelas AC's sejam aceitos durante as chamadas.
Este processo de verificação períodica é realizado de forma manual, porém existe uma API do Diretório de Participantes que já agrega todas as AC's permitidas.

Este projeto consulta a API do diretório e cria um arquivo .pem com todas as AC's permitidas no ecossistema Open Finance Brasil(cas.pem) e também cria a lista de certificados revogados(crls.pem), desta forma este trabalho pode ser automatizado (com um cron por exemplo)

## Para criar o arquivo .pem com as AC's de sandbox
```
node index.js sandbox
```

## Para criar o arquivo .pem com as AC's de produção
```
node index.js production
```

## Arquivos gerados
Os comandos acima irão criar dois arquivos no diretório certs (cas.pem e crls.pem).
O arquivo crls.pem só é gerado quando a ambiente informado for *production*.

* cas.pem - Arquivo que compila todas as Autoridades Certificadoras do Open Finance.
* crls.pem - Arquivo que compila todas as Listas de Certificados Revogados emitidos pelas AC's do Open Finance.

## Exemplo de utilização
Considerando que você esteja utilizando Nginx como proxy, você pode habilitar a verificação do certificado do cliente (mTLS) com as linhas abaixo em seu nginx.conf.

```
ssl_client_certificate /etc/nginx/certs/cas.pem;
ssl_verify_client on;
```
*Obs: Considerando que o arquivo gerado em certs/cas.pem deste projeto foi copiado para /etc/nginx/certs/cas.pem.*

Para habilitar o CRL, você pode configurar o seu nginx.conf com a linha abaixo.
```
ssl_crl /etc/nginx/certs/crls.pem;
```
*Obs: Considerando que o arquivo gerado em certs/crls.pem deste projeto foi copiado para /etc/nginx/certs/crls.pem.*

## Automação
Como algumas AC's disponibilizam CRLs de curta validade (1 hora), o ideal é que a geração periódica seja inferior a este tempo, afim de garatir que o proxy sempre possua uma lista válida de certificados revogados.

Em um servidor linux, você pode fazer essa automação utilizando o cron.

