const mongoose = require("mongoose");

// Defina a string de conexão do MongoDb no arquivo .env
const MONGOURI = process.env.MONGODB_URL

const InicializaMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
    //Configurações para evitar os erros de deprecated functions (funções descontinuadas)
    //Para saber mais: https://mongoosejs.com/docs/deprecations.html
    useNewUrlParser: true, //Atribuímos para utilizar o novo Parser de URL
    useCreateIndex: true, //Como a função ensureIndex() está descontinuada, iremos forçar para ele utilizar o CreateIndex.
    useFindAndModify: false, //Definimos como false para fazer com que o Mongoose utilize os métodos findOneAndUpdate() e findOneAndRemove() por padrão
    useUnifiedTopology: true // Para utilizarmos a nova engine para Descoberta e Monitoramento de Servidores
    });
    console.log("🔌 Conectado ao MongoDB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InicializaMongoServer;

