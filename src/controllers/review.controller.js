const ReviewModel = require('../models/review.model');

// Criar uma nota
const createReview = (req, res) => {
  const { movieId, userId, rating, comment } = req.body;
  if (!movieId || !userId || rating === undefined) {
    return res.status(400).json({ error: 'Os campos movieId, userId e rating são obrigatórios.' });
  }
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'A nota (rating) deve ser entre 1 e 5.' });
  }
  const newReview = ReviewModel.create({ movieId, userId, rating, comment });
  return res.status(201).json(newReview);
};

// Atualizar uma Nota Existente
const updateReview = (req, res) => {
  const { id } = req.params; // Apanha o ID da review que vem na rota (ex: /api/reviews/1)
  const { rating, comment } = req.body; // Recebe a nova nota ou novo comentário

  // Se o utilizador estiver a alterar a nota, valida se está entre 1 e 5
  if (rating !== undefined && (rating < 1 || rating > 5)) {
    return res.status(400).json({ error: 'A nota (rating) deve ser entre 1 e 5.' });
  }

  // Atualiza no nosso modelo em memória
  const updatedReview = ReviewModel.update(id, { rating, comment });

  // Se não encontrar nenhuma review com esse ID, dá erro 404
  if (!updatedReview) {
    return res.status(404).json({ error: 'Review não encontrada.' });
  }

  // Devolve a review atualizada com sucesso
  return res.status(200).json(updatedReview);
};

module.exports = {
  createReview,
  updateReview // Exporta a nova função
};