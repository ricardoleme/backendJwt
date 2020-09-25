// cSpell:Ignore usuario
const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("token") || req.headers["x-access-token"] 
  if (!token) return res.status(401).json({ mensagem: "É obrigatório o envio do token!" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.usuario = decoded.usuario;
    next();
  } catch (e) {
    console.error(e.message);
    res.status(403).send({ error: `Token inválido: ${e.message}` });
  }
};
