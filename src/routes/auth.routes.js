const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Função que cria o "bilhete" de entrada do utilizador
const generateToken = (id) => {
  // Usa a frase secreta que colocaste no .env para trancar o token
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // O login dura 30 dias
  });
};

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Regista um novo utilizador na aplicação
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ulysse Cancela"
 *               email:
 *                 type: string
 *                 example: "ulysse@ipvc.pt"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Conta criada com sucesso!
 */

// ----------------------------------------------------
// ROTA 1: REGISTAR UM NOVO UTILIZADOR (POST /api/auth/register)
// ----------------------------------------------------
router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1. Verifica se o email já existe na Base de Dados
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Este email já está registado" });
    }

    // 2. Cria o utilizador na Base de Dados
    const user = await User.create({
      name,
      email,
      password,
    });

    // 3. Devolve a resposta ao Angular com o Token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error); // Se algo correr mal, envia para o errorHandler
  }
});

// ----------------------------------------------------
// ROTA 2: FAZER LOGIN (POST /api/auth/login)
// ----------------------------------------------------
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Procura o utilizador pelo email
    const user = await User.findOne({ email });

    // 2. Se o utilizador existir, verifica se a password bate certo
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ error: "Email ou password incorretos" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;