const Watchlist = require('../models/watchlist.model');

const VALID_STATUSES = ['pending', 'watching', 'watched'];

// POST /api/watchlist
const addToWatchlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const { movieId, movieTitle, moviePoster, status } = req.body;

        if (!movieId || !movieTitle) {
            return res.status(400).json({ error: 'Os campos movieId e movieTitle são obrigatórios.' });
        }

        if (status && !VALID_STATUSES.includes(status)) {
            return res.status(400).json({ error: 'Status inválido. Use: pending, watching ou watched.' });
        }

        const existing = await Watchlist.findOne({ userId, movieId });
        if (existing) {
            return res.status(409).json({ error: 'Este filme já está na watchlist.' });
        }

        const newItem = await Watchlist.create({ userId, movieId, movieTitle, moviePoster, status });
        return res.status(201).json(newItem);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao adicionar à watchlist.' });
    }
};

// GET /api/watchlist
const getWatchlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const items = await Watchlist.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao obter watchlist.' });
    }
};

// PUT /api/watchlist/:id
const updateWatchlistItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status || !VALID_STATUSES.includes(status)) {
            return res.status(400).json({ error: 'Status inválido. Use: pending, watching ou watched.' });
        }

        const updated = await Watchlist.findByIdAndUpdate(id, { status }, { new: true });

        if (!updated) {
            return res.status(404).json({ error: 'Item não encontrado na watchlist.' });
        }

        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar watchlist.' });
    }
};

// DELETE /api/watchlist/:id
const removeFromWatchlist = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Watchlist.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Item não encontrado na watchlist.' });
        }

        return res.status(200).json({ message: 'Item removido da watchlist com sucesso.' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao remover da watchlist.' });
    }
};

module.exports = { addToWatchlist, getWatchlist, updateWatchlistItem, removeFromWatchlist };