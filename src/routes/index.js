const { Router } = require("express");
const authRoutes = require("./auth.routes"); 
const reviewRoutes = require("./review.routes"); // 1. Importar as tuas rotas de reviews

const router = Router();

// Rota de teste que já vinha no template
router.get("/", (_req, res) => {
  res.json({ message: "API is running" });
});

// Usar as rotas de autenticação
router.use("/auth", authRoutes); 

// 2. Dizer à aplicação para usar as rotas de reviews
// O frontend vai aceder através de: /api/reviews
router.use("/reviews", reviewRoutes); 

module.exports = router;