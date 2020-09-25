const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const Passeador = require("../model/Passeador");

/**
 * @method - GET
 * @description - Obter informações de TODOS os passeadores
 * @param - /passeador
 */
router.get("/", auth, async (req, res) => {
  try {
    // auth garantirá que foi enviado o token.
    const passeador = await Passeador.find().sort({estrelas:-1});
    res.json(passeador);
  } catch (e) {
    res.send({ error: `Erro ao obter os dados dos passeadores: ${e.message}` });
  }
});

module.exports = router;

/**
 * @method - GET
 * @description - Obter informações de um determinado passeador
 * @param - /passeador/:id
 */

router.get("/:id", auth, async (req, res) => {
  try {
    // auth garantirá que foi enviado o token.
    const passeador = await Passeador.findById(req.params.id);
    res.json(passeador);
  } catch (e) {
    res.send({ mensagem: `Erro ao obter os dados do passeador: ${e.message}` });
  }
});

/**
 * @method - POST
 * @param - /passeador
 * @description - Novo Passeador
 */

router.post("/",
  [
    check("nome", "Por favor, informe o nome do Passeador").not().isEmpty(),
    check("avatar", "É obrigatório informar o avatar do passeador").not().isEmpty()  
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
      passeador = new Passeador(
        req.body
      );
      await passeador.save();     
    } catch (err) {
      console.log(err.message);   
      return res.status(500).json({
        errors: `Erro ao salvar o passeador: ${err.message}`
      });
    }
  }
);


