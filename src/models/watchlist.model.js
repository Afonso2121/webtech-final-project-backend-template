// Lista em memória que guarda todos os itens da watchlist enquanto o servidor está ativo
const watchlistItems = [];

class WatchlistModel {
    // Retorna todos os filmes da watchlist de um utilizador específico
    static getByUserId(userId) {
        return watchlistItems.filter(item => item.userId === userId);
    }

    // Verifica se um filme já existe na watchlist de um utilizador (evita duplicados)
    static findByUserAndMovie(userId, movieId) {
        return watchlistItems.find(
            item => item.userId === userId && item.movieId === movieId
        );
    }

    // Cria e guarda um novo item na watchlist
    static create(itemData) {
        const newItem = {
            id: (watchlistItems.length + 1).toString(), // Gera um ID automático simples
            userId: itemData.userId,                     // ID do utilizador
            movieId: itemData.movieId,                   // ID do filme vindo do frontend
            movieTitle: itemData.movieTitle,             // Título do filme
            moviePoster: itemData.moviePoster || null,   // Poster do filme (opcional)
            status: itemData.status || 'pending',        // Estado: pending | watching | watched
            createdAt: new Date()
        };
        watchlistItems.push(newItem);
        return newItem;
    }

    // Atualiza o estado (status) de um item da watchlist
    static update(id, updatedData) {
        const index = watchlistItems.findIndex(item => item.id === id);
        if (index !== -1) {
            watchlistItems[index] = {
                ...watchlistItems[index],
                ...updatedData,
                updatedAt: new Date()
            };
            return watchlistItems[index];
        }
        return null;
    }

    // Remove um item da watchlist pelo ID
    static delete(id) {
        const index = watchlistItems.findIndex(item => item.id === id);
        if (index !== -1) {
            const deleted = watchlistItems.splice(index, 1);
            return deleted[0];
        }
        return null;
    }
}

module.exports = WatchlistModel;