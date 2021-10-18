# Plataforma de Jogos Eletrônicos 
## Introdução

O objeto desse projeto é mostrar meus conhecimentos em JavaScript, TypeScript e NodeJS.
Foi criado um CRUD de várias tabelas para simular o cadastro de jogos eletrônicos.
Também foi feito um exemplo de documentação pelo Swagger.

## Descrição técnica
Foi proposto desenvolver o projeto utilizando TSOA (TypeScript OpenAPI), para fazer a geração das rotas e documentação via Swagger. Também foi proposto utilizar TypeScript para ambiente de desenvolvimento. Foi usado PostgreSQL como banco de dados.

Foi usado Docker tanto para o NodeJS quanto para o PostgresSQL.

Existe migration para criar a base de dados e alguns registros iniciais para teste e um arquivo com as rotas exportadas do Postman.

A resposta do teste analitico e teórico, está no arquivo __resposta.md__.

## Instalação
Após clonar o projeto, deve-se fazer uma cópia e renomear os seguintes arquivos:
```shell
> .env.sample para .env
> ormconfig.json.sample para ormconfig.json
```

Após isso, deve-se executar o comando para subir o docker:
```shell
> docker-compose up
```
Obs: Pode-se usar o -d para rodar em daemon e não travar o terminal. Por gosto pessoal, eu prefiro rodar sem o -d, para monitorar os erros e os debugs do codigo no terminal.

Após o docker subir, verificar se o banco foi criado no Postgres. Pode-se usar o DBEaver, Heide ou afins. Para conectar, usar as seguintes informações:
```markdown
Host: localhost
User: postgres
Password: dev123
Port: 54320
```
Se por acaso o banco não foi criado, deve-se criar um banco chamado __james_dev__.

Após a verificação do banco de dados, deverá ser instalado as depêndencias com o yarn e depois rodar os migrations do banco de dados, com as seguintes instruções:
```shell
# acessando o container do docker
> docker-compose exec james_web bash

# instalando as dependências
> yarn install

# executando as migrações
# yarn dev:typeorm migration:run
```

Com as migrações já instaladas, deve executar o comando para criar o arquivo do swagger.
```shell
> yarn build:swagger
```

Nesse ponto, a aplicação está pronta pra ser testada. Ela irá subir na porta 4000.

Para testar no Postman, existe um arquivo na raíz do projeto, chamdo __James.postman_collection.json__. Basta importa-lo no Postman. Já existe alguns exemplos de JSON para realizar os cadastros. Só precisa alterar as UUIDS de cada registro, com as que foram de fato cadastradas.

## Possíveis melhorias
Devido ao tempo, existe algumas outras coisas que eu gostaria de ter feito para melhoria do projeto:

### Swagger
Foi feito apenas o swagger do CRUD de Categoria, como exemplo. Seria interessante fazer com todos os CRUDS, para criar um documentação mais fiel a realidade do dia a dia.

### Testes
Nesse projeto, não criei nenhum teste unitário. Porém, no teste do calculo de distância, existe alguns testes unitários e integrados que foram realizados.

### Autenticação
Não foi realizada nenhuma autenticação, mas não seria dificil implementá-la. Utitlizar JWT ou OAuth para tal seria importante.

### Melhor arquitetura
Foi feito uma separação bem básica das camadas da aplicação. Seria importante realizar uma análise e planejamento da arquitetura ideal para esse projeto, separando as camadas visando o máximo de desacoplamento possível do código, sendo possível substituir camadas da aplicação sem grande esforço. Utilizadação de Clean Arch, DDD e Solid poderiam resolver esse problema.

---
Qualquer dúvida, estou a disposição para saná-las.

Muito obrigado!

---


# Pré-Requisitos

Para considerarmos a API aceitável temos alguns requisitos:

- API Rodando sem erros/bugs
- CRUD sendo efetuado
- Documentação da API
- Descrever como chegou a solução 

## Desejáveis
- Testes utilizando a biblioteca [JEST](https://jestjs.io/docs/getting-started)
- Projeto rodando em [Docker](https://docs.docker.com/)

## Observações

O Projeto não precisa ser documentado em swagger
