const express = require("express");
const router = express.Router();

// ROTA 1: CRIAR UMA REVIEW (POST /api/reviews)
router.post("/", async (req, res, next) => {
  try {
    const { movieId, movieTitle, rating, comment, userId } = req.body;

    console.log(`🎬 Nova review recebida para o filme: ${movieTitle}`);
    console.log(`✍️ Comentário: "${comment}" | Nota: ${rating}/5`);
    
    res.status(201).json({
      message: "Review criada com sucesso no backend!",
      data: { movieId, movieTitle, rating, comment }
    });
  } catch (error) {
    next(error);
  }
});

// ROTA 2: EDITAR UMA REVIEW (PUT /api/reviews/:id)
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    res.json({
      message: "Review atualizada com sucesso!",
      data: { id, rating, comment }
    });
  } catch (error) {
    next(error);
  }
});

// ROTA 3: REMOVER UMA REVIEW (DELETE /api/reviews/:id)
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    res.json({
      message: "Review removida com sucesso!"
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;