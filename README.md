# The open Open Banking Brasil project - Update AC's
Atualmente as AC's do Open Finance Brasil estão documentadas em [Padrão de Certificados do Open Finance Brasil](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/82313425/PT+Padr+o+de+Certificados+Open+Finance+Brasil+2.0) e cabe as instituições verificar quais AC's estão homologadas, consultar seus certificados no site do ITI e adicioná-los as suas plataformas para que participantes utilizando os certificados emitidos pelas AC's sejam aceitos durante as chamadas.
Este processo de verificação períodica é realizado de forma manual, porém existe uma API do Diretório de Participantes que já agrega todas as AC's permitidas.

Este projeto consulta a API do diretório e cria um arquivo .pem com todas as AC's permitidas no ecossistema Open Finance Brasil, desta forma este trabalho pode ser automatizado (com um cron por exemplo)

## Para criar o arquivo .pem com as AC's de sandbox

```
node index.js sandbox
```

## Para criar o arquivo .pem com as AC's de produção

```
node index.js production
```

Os comandos acima irão jogar no output o conteúdo do arquivo .pem, caso você queira direcionar a saída para um arquivo de destino, pode usar o exemplo abaixo

```
node index.js production > /var/html/arquivo.pem
```

Você pode também informar o arquivo de destino diretamente

```
node index.js production /var/html/arquivo.pem
```
