const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        movieId: {
            type: String,
            required: true,
        },
        movieTitle: {
            type: String,
            required: true,
        },
        moviePoster: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            enum: ['pending', 'watching', 'watched'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

watchlistSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('Watchlist', watchlistSchema);