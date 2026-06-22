const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite.controller');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, favoriteController.addFavorite);
router.get('/', protect, favoriteController.getFavorites);
router.delete('/:id', protect, favoriteController.removeFavorite);

module.exports = router;