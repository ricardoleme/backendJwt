// cSpell:Ignore usuario, versao
require('dotenv').config()
const express = require("express")
const cors = require('cors')
const bodyParser = require("body-parser")
const InicializaMongoServer = require("./config/db")
//Definindo as rotas da aplicação
const usuario = require("./routes/usuario")
const passeador = require("./routes/passeador")


// Inicializamos o servidor MongoDb
InicializaMongoServer();

const app = express();

// Porta Default
const PORT = process.env.PORT || 4000;

// Exemplo de Middleware 
app.use(function(req, res, next) {
   // Em produção, remova req.headers.origin e atualize com o domínio do seu app
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  // Cabeçalhos que serão permitidos
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  // Métodos que serão permitidos
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();  
});

// parse application/json
app.use(bodyParser.json())


app.get("/", (req, res) => {
  res.json({ mensagem: "👏 API 100% funcional!", versao: "1.1.03" });
});

/**
 * Router Middleware
 * Router - /usuario/*
 * Method - *
 */
app.use("/usuario", usuario);

/**
 * Router Middleware
 * Router - /passeador/*
 * Method - *
 */
app.use("/passeador", passeador);

app.listen(PORT, (req, res) => {
  console.log(`🖥️ Servidor iniciado na porta ${PORT}`);
});


