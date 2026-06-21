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

// Atualizar uma nota
const updateReview = (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  if (rating !== undefined && (rating < 1 || rating > 5)) {
    return res.status(400).json({ error: 'A nota (rating) deve ser entre 1 e 5.' });
  }

  const updatedReview = ReviewModel.update(id, { rating, comment });

  if (!updatedReview) {
    return res.status(404).json({ error: 'Review não encontrada.' });
  }

  return res.status(200).json(updatedReview);
};

//  Remover uma Nota Existente
const deleteReview = (req, res) => {
  const { id } = req.params; // Apanha o ID da review na URL

  const deletedReview = ReviewModel.delete(id);

  // Se a review não existir na nossa memória, dá erro 404
  if (!deletedReview) {
    return res.status(404).json({ error: 'Review não encontrada para remover.' });
  }

  // Retorna uma mensagem de sucesso e a review que foi apagada
  return res.status(200).json({ 
    message: 'Review removida com sucesso.', 
    deletedReview 
  });
};

module.exports = {
  createReview,
  updateReview,
  deleteReview //  Exporta a nova função de remoção
};