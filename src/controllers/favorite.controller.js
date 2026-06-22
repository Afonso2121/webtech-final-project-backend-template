const Favorite = require('../models/favorite.model');

// POST /api/favorites
const addFavorite = async (req, res) => {
    try {
        const userId = req.user._id;
        const { movieId, movieTitle, moviePoster } = req.body;

        if (!movieId || !movieTitle) {
            return res.status(400).json({ error: 'Os campos movieId e movieTitle são obrigatórios.' });
        }

        const existing = await Favorite.findOne({ userId, movieId });
        if (existing) {
            return res.status(409).json({ error: 'Este filme já está nos favoritos.' });
        }

        const newFavorite = await Favorite.create({ userId, movieId, movieTitle, moviePoster });
        return res.status(201).json(newFavorite);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao adicionar favorito.' });
    }
};

// GET /api/favorites
const getFavorites = async (req, res) => {
    try {
        const userId = req.user._id;
        const favorites = await Favorite.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json(favorites);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao obter favoritos.' });
    }
};

// DELETE /api/favorites/:id
const removeFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Favorite.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Favorito não encontrado.' });
        }

        return res.status(200).json({ message: 'Favorito removido com sucesso.' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao remover favorito.' });
    }
};

module.exports = { addFavorite, getFavorites, removeFavorite };