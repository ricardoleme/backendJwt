//cSpell:ignore descricao, codigobarra, preco
const mongoose = require('mongoose')

//Criamos o schema Produto
const ProdutoSchema = mongoose.Schema({
    nome: { type: String },
    descricao: {type: String, required:false},
    codigobarra: {type: String}, 
    preco: {type: Number}
},
{timestamps: true}
)

module.exports = mongoose.model('produtos',ProdutoSchema)