const favoritesList = [];

class FavoriteModel {
  static getAll() {
    return favoritesList;
  }

  static getByUserId(userId) {
    return favoritesList.filter(favorite => favorite.userId === userId);
  }

  static getById(id) {
    return favoritesList.find(favorite => favorite.id === id);
  }

  static findByUserAndMovie(userId, movieId) {
    return favoritesList.find(
      favorite => favorite.userId === userId && favorite.movieId === movieId
    );
  }

  static create(favoriteData) {
    const newFavorite = {
      id: (favoritesList.length + 1).toString(),
      userId: favoriteData.userId,
      movieId: favoriteData.movieId,
      movieTitle: favoriteData.movieTitle,
      moviePoster: favoriteData.moviePoster || null,
      createdAt: new Date()
    };

    favoritesList.push(newFavorite);
    return newFavorite;
  }

  static delete(id) {
    const index = favoritesList.findIndex(favorite => favorite.id === id);
    if (index !== -1) {
      const deleted = favoritesList.splice(index, 1);
      return deleted[0];
    }
    return null;
  }
}

module.exports = FavoriteModel;