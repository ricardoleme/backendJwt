const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({
  nome: {
    type: String,
    minlength: [2, 'O nome do usuário é muito curto'],
    maxlength: [30, 'O nome do usuário é muito longo'],
    required: [true, 'O nome do usuário é obrigatório']
  },
  email: {
    type: String,
    unique: true, //Criamos um índice único
    validate: {
            validator: function(email) { //Utilizaremos Regex para validar - \w (word character)
              return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
            },
            message: props => props.value +' não é um e-mail válido!'
    }    
  },
  senha: {
    type: String,
    required: true
  },
  ativo: { type: Boolean, default: true },
  tipo: {
    type: String,
    enum: ['administrador', 'digitador', 'gerencial'],
    default: 'digitador'
  }
},
{ 
    timestamps: { createdAt: 'criado_em', updatedAt: 'alterado_em' } 
}
);

//Exportando o usuario através do UsuarioSchema
module.exports = mongoose.model("usuario", UsuarioSchema);
