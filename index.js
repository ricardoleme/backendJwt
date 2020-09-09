require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const usuario = require("./routes/usuario");
const InicializaMongoServer = require("./config/db");

// Initializamos o servidor MongoDb
InicializaMongoServer();

const app = express();

// Porta Default
const PORT = process.env.DEFAULT_PORT || 4000;

// Middleware
app.use(function(req, res, next) {
   // atualize com o domínio do seu app
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:19006");
  // Cabeçalhos que serão permitidos
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  // Métodos que serão permitidos
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();  
});

// parse application/json
app.use(bodyParser.json())


app.get("/", (req, res) => {
  res.json({ mensagem: "👏 API 100% funcional!" });
});

/**
 * Router Middleware
 * Router - /usuario/*
 * Method - *
 */
app.use("/usuario", usuario);

app.listen(PORT, (req, res) => {
  console.log(`🖥️ Servidor iniciado na porta ${PORT}`);
});
