
### Exemplo de um backend com JWT (MongoDB e NodeJS)

## Índice 
   * [1. Introdução](#1-introdução) 
   * [2. Pré Requisitos](#2-pré-requisitos) 
   * [3. Pacotes Necessários](#3-pacotes-necessários)
   * [4. Inicializando o projeto](#4-inicializando-o-projeto)
----


### 1. Introdução

O JWT é um padrão (RFC-7519) de mercado que define como transmitir e armazenar objetos JSON de forma compacta e segura entre diferentes aplicações. Os dados nele contidos podem ser validados a qualquer momento pois o token é assinado digitalmente.

O processo que iremos criar nesta API é composto de diversos passos que podem ser resumidos na figura a seguir:


![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/k2vi3g73qy12ebznxqzs.png)


----
### 2. Pré Requisitos
Você deve ter algum conhecimento básico em `javascript`, `nodejs` e `ES6`. 
Obrigatoriamente o **nodejs** deve estar instalado no seu sistema. 

----

### 3. Pacotes necessários


Serão necessários os seguintes pacotes, que poderão ser instalados via npm.

1. **express**
Express é um framework para `nodejs`. Ele é minimalista, flexível e contém um robusto conjunto de recursos para desenvolver aplicações web, como um sistema de Views intuitivo (MVC), um robusto sistema de roteamento, um executável para geração de aplicações e muito mais.


2. **express-validator**
Para validar o corpo dos dados no servidor, dentro do framework express, será utilizado esta biblioteca.
Ela permite uma validação no lado do servidor. Dessa forma, se o usuário desabilitar a validação no lado cliente, faremos essa validação no lado servidor e exibiremos um erro.

3. **body-parser**
Este é o middleware `nodejs` para efetuar o parse dentro do corpo dos dados. (body data)

4. **bcryptjs**
Esta biblioteca será utilizada para efetuarmos o hash da senha e assim podermos armazená-la no MongoDB. Dessa maneira, mesmo os usuários administradores não terão acesso a conta do usuário.


5. **jsonwebtoken**
**jsonwebtoken** will be used to encrypt our data payload on registration and return a token. We can use that **token** to authenticate ourselves to secured pages like the dashboard. There would also an option to set the validity of those token, so you can specify how much time that token will last. 

6. **mongoose**
Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.

7. **nodemon**
O nodemon é uma daquelas ferramentas de grande utilidade para quem trabalha com `nodejs`
Basicamente ele é um file watcher que roda internamente o próprio comando **node**. A diferença entre usá-lo ou usar o comando **node** é que ele faz auto-restart da aplicação, toda vez que um arquivo do projeto for modificado.

8. **dotenv**
O **dotenv** permite a criação de variáveis de ambiente. 
Ele é um módulo de dependência que carrega variáveis de ambiente de um arquivo .env para process.env.
As variáveis de ambiente ajudam a definir valores que não queremos codificar diretamente em nosso código fonte.
----

### 4. Inicializando o projeto

Para iniciar este projeto, utilizaremos o nodemon (ele efetua o hot reload)


```
npm i
nodemon

```

Renomeie o arquivo .env-exemplo para .env e informe a sua string de conexão do MongoDb.

**Código baseado no seguinte artigo** : 

https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i
