const WatchlistModel = require('../models/watchlist.model');

const VALID_STATUSES = ['pending', 'watching', 'watched'];

// POST /api/watchlist
const addToWatchlist = (req, res) => {
    const userId = req.user._id.toString();
    const { movieId, movieTitle, moviePoster, status } = req.body;

    if (!movieId || !movieTitle) {
        return res.status(400).json({ error: 'Os campos movieId e movieTitle são obrigatórios.' });
    }

    if (status && !VALID_STATUSES.includes(status)) {
        return res.status(400).json({ error: 'Status inválido. Use: pending, watching ou watched.' });
    }

    const existing = WatchlistModel.findByUserAndMovie(userId, movieId);
    if (existing) {
        return res.status(409).json({ error: 'Este filme já está na watchlist.' });
    }

    const newItem = WatchlistModel.create({ userId, movieId, movieTitle, moviePoster, status });
    return res.status(201).json(newItem);
};

// GET /api/watchlist
const getWatchlist = (req, res) => {
    const userId = req.user._id.toString();
    const items = WatchlistModel.getByUserId(userId);
    return res.status(200).json(items);
};

// PUT /api/watchlist/:id
const updateWatchlistItem = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !VALID_STATUSES.includes(status)) {
        return res.status(400).json({ error: 'Status inválido. Use: pending, watching ou watched.' });
    }

    const updated = WatchlistModel.update(id, { status });

    if (!updated) {
        return res.status(404).json({ error: 'Item não encontrado na watchlist.' });
    }

    return res.status(200).json(updated);
};

// DELETE /api/watchlist/:id
const removeFromWatchlist = (req, res) => {
    const { id } = req.params;

    const deleted = WatchlistModel.delete(id);

    if (!deleted) {
        return res.status(404).json({ error: 'Item não encontrado na watchlist.' });
    }

    return res.status(200).json({ message: 'Item removido da watchlist com sucesso.', deletedItem: deleted });
};

module.exports = { addToWatchlist, getWatchlist, updateWatchlistItem, removeFromWatchlist };