// cSpell:Ignore maxlength, usuario, passeadors, preco, servicos
const mongoose = require('mongoose');

//Criando o schema Favoritos do Passeador
const favoritosSchema = mongoose.Schema({
    usuarioId : {type: mongoose.Schema.Types.ObjectId, ref: 'usuario'}
});

//Criando o schema Fotos do Passeador
const fotosSchema = mongoose.Schema({
    url : {type: String}
});

//Criando o schema Serviços do Passeador
const servicosSchema = mongoose.Schema({
    nome : {type: String},
    preco : {type: Number, min: 0}
});

//Criando o schema Testemunhos do Passeador
const testemunhosSchema = mongoose.Schema({
    usuario : {type: String},
    estrelas: { type: Number, min: 0, max: 5 },
    texto: {type: String}
});

//Criando o Schema Passeador
const PasseadorSchema = mongoose.Schema({
    nome: {
        type: String,
        minlength: [2, 'O nome é muito curto'],
        maxlength: [100, 'O nome é muito longo'],
        required: [true, 'O nome do profissional é obrigatório']
    },
    avatar: {
        type: String,
        maxlength: [1000, 'A URL da imagem é muito longa'],
        required: false
    },
    estrelas: { type: Number, min: 0, max: 5 },
    favoritos: [favoritosSchema],
    fotos: [fotosSchema],
    testemunhos: [testemunhosSchema],
    servicos: [servicosSchema]
}, {
    timestamps: true
});

/*
O terceiro parâmetro é o nome da collection que será gerada no MongoDB
Por padrão, é adicionado apenas um s no fim. Ex: passeadors
*/
module.exports = mongoose.model('passeador', PasseadorSchema, 'passeadores');