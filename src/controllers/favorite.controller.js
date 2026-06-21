const FavoriteModel = require('../models/favorite.model');

const addFavorite = (req, res) => {
    const userId = req.user._id.toString();
    const { movieId, movieTitle, moviePoster } = req.body;

    if (!movieId || !movieTitle) {
        return res.status(400).json({ error: 'Os campos movieId e movieTitle são obrigatórios.' });
    }

    const existing = FavoriteModel.findByUserAndMovie(userId, movieId);
    if (existing) {
        return res.status(409).json({ error: 'Este filme já está nos favoritos.' });
    }

    const newFavorite = FavoriteModel.create({ userId, movieId, movieTitle, moviePoster });
    return res.status(201).json(newFavorite);
    const getFavorites = (req, res) => {
        const userId = req.user._id.toString();
        const favorites = FavoriteModel.getByUserId(userId);
        return res.status(200).json(favorites);
    };
    const removeFavorite = (req, res) => {
        const { id } = req.params;

        const deleted = FavoriteModel.delete(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Favorito não encontrado.' });
        }

        return res.status(200).json({ message: 'Favorito removido com sucesso.', deletedFavorite: deleted });
    };

    module.exports = { addFavorite, getFavorites, removeFavorite };
};
