const express = require("express");
const router = express.Router();

// Rota básica temporária
router.get("/", (req, res) => {
  res.json({ message: "Rota de favoritos ativa" });
});

module.exports = router;