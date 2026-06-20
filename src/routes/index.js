const { Router } = require("express");
const authRoutes = require("./auth.routes"); // <-- 1. Importar as rotas novas

const router = Router();

// Rota de teste que já vinha no template
router.get("/", (_req, res) => {
  res.json({ message: "API is running" });
});

// 2. Dizer à aplicação para usar as rotas de autenticação
// Isto significa que o Angular vai aceder através de: /api/auth/register
router.use("/auth", authRoutes); 

module.exports = router;