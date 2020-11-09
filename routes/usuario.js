//cSpell:Ignore Usuario
const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const Usuario = require("../model/Usuario");

//https://medium.com/tableless/entendendo-tokens-jwt-json-web-token-413c6d1397f6

/**
 * @method - POST
 * @param - /usuario/novo
 * @description - Novo Usuário
 */

router.post(
  "/novo",
  [
    check("nome", "Por favor, informe o nome do usuário").not().isEmpty(),
    check("avatar", "Não foi possível gerar o avatar do usuário").isEmpty(),
    check("email", "Informe um e-mail válido").isEmail(),
    check("senha", "Informe uma senha com no mínimo 6 caracteres").isLength({min: 6}),
    check("tipo","Informe um tipo de usuário válido!").isIn(['administrador', 'cliente', 'profissional'])   
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { nome, email, senha, avatar, tipo } = req.body;
    try {
      let usuario = await Usuario.findOne({
        email
      });
      if (usuario) {
        return res.status(400).json({
          mensagem: "O e-mail informado já existe em outro usuário!"
        });
      }

      usuario = new Usuario({
        nome,
        email,
        senha,
        avatar,
        tipo
      });

      const salt = await bcrypt.genSalt(10);
      usuario.senha = await bcrypt.hash(senha, salt);
      // Criando um avatar randômico com a API Adorable.io
      usuario.avatar =  'https://api.adorable.io/avatars/256/'+email+'.png'
      

      await usuario.save();
      //O Payload é um objeto JSON com as Claims (informações) da entidade tratada, normalmente o usuário autenticado.
      const payload = {
        usuario: {
          id: usuario.id
        }
      };

      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        {
          expiresIn: 21600 // 6 horas
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (err) {
      //console.log(err.message);   
      return res.status(500).json({
        errors: `Erro ao salvar o usuário: ${err.message}`
      });
    }
  }
);
/**
 * @method - POST
 * @param - /usuario/login
 * @description - Login do usuário
 */
router.post(
  "/login",
  [
    check("email", "Por favor, informe um e-mail válido").isEmail(),
    check("senha", "Informe uma senha com no mínimo 6 caracteres").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, senha } = req.body;
    try {
      let usuario = await Usuario.findOne({
        email
      });
      if (!usuario)
        return res.status(400).json({
          mensagem: "Não existe nenhum usuário com o e-mail informado!"
        });

      const isMatch = await bcrypt.compare(senha, usuario.senha);
      if (!isMatch)
        return res.status(400).json({
          mensagem: "A senha informada está incorreta !"
        });

      const payload = {
        usuario: {
          id: usuario.id
        }
      };

      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        {
          expiresIn: 21600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        mensagem: `Erro no Servidor: ${e.message}`
      });
    }
  }
);

/**
 * @method - GET
 * @description - Obter informações do usuário atual
 * @param - /usuario/eu
 */

router.get("/eu", auth, async (req, res) => {
  try {
    // auth garantirá que foi enviado o token.
    const usuario = await Usuario.findById(req.usuario.id, {senha: 0, criado_em: 0, alterado_em:0, __v:0});
    res.json(usuario);
  } catch (e) {
    res.send( `Erro ao obter os dados do usuário: ${e.message}` );
  }
});

module.exports = router;
