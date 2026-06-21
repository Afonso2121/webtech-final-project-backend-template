const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlist.controller');
const { protect } = require('../middleware/authMiddleware');

// POST /api/watchlist — Adicionar um filme à watchlist (requer autenticação)
router.post('/', protect, watchlistController.addToWatchlist);

// GET /api/watchlist — Listar todos os filmes da watchlist do utilizador (requer autenticação)
router.get('/', protect, watchlistController.getWatchlist);

// PUT /api/watchlist/:id — Atualizar o estado de um filme (pending, watching, watched)
router.put('/:id', protect, watchlistController.updateWatchlistItem);

// DELETE /api/watchlist/:id — Remover um filme da watchlist (requer autenticação)
router.delete('/:id', protect, watchlistController.removeFromWatchlist);

module.exports = router;