const ReviewModel = require('../models/review.model');

// Adicionar uma Nota a um filme
const createReview = (req, res) => {
  const { movieId, userId, rating, comment } = req.body;

  // Validação dos dados que vêm do frontend
  if (!movieId || !userId || rating === undefined) {
    return res.status(400).json({ 
      error: 'Os campos movieId, userId e rating são obrigatórios.' 
    });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'A nota (rating) deve ser entre 1 e 5.' });
  }

  // Guarda em memória usando o modelo do Issue 9
  const newReview = ReviewModel.create({ movieId, userId, rating, comment });

  // Retorna o objeto criado com o status 201
  return res.status(201).json(newReview);
};

module.exports = {
  createReview
};