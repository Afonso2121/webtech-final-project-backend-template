const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Verifica se o Angular enviou o Token no formato correto (Bearer Token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Isola o token (tira a palavra "Bearer " da frente)
      token = req.headers.authorization.split(" ")[1];

      // Descodifica o token para ver o ID do utilizador usando a tua frase secreta
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Vai buscar os dados do utilizador à Base de Dados (exceto a password)
      // E guarda-os na variável req.user para a Ana e o Eric poderem usar nas rotas deles!
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Tudo certo! Deixa o utilizador prosseguir.
    } catch (error) {
      res.status(401).json({ error: "Não autorizado, token inválido" });
    }
  }

  // Se a pessoa tentou entrar numa rota protegida sem enviar nenhum token
  if (!token) {
    res.status(401).json({ error: "Não autorizado, nenhum token enviado" });
  }
};

module.exports = { protect };