const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');

// Mapeia o método POST para a função do controlador
router.post('/', reviewController.createReview);

// PUT para atualizar
router.put('/:id', reviewController.updateReview);

// DELETE para remover 
router.delete('/:id', reviewController.deleteReview);

module.exports = router;