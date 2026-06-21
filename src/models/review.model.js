// Simulação de base de dados em memória para as Reviews
const reviewsList = [];

class ReviewModel {
  // Retorna todas as reviews guardadas
  static getAll() {
    return reviewsList;
  }

  // Procura reviews filtradas pelo ID de um filme específico
  static getByMovieId(movieId) {
    return reviewsList.filter(review => review.movieId === movieId);
  }

  // Cria e guarda uma nova review/nota na lista
  static create(reviewData) {
    const newReview = {
      id: (reviewsList.length + 1).toString(), // Gera um ID automático simples
      movieId: reviewData.movieId,             // ID do filme vindo do frontend
      userId: reviewData.userId,               // ID do utilizador vindo do frontend
      rating: reviewData.rating,               // Nota (ex: 1 a 5)
      comment: reviewData.comment,             // Comentário escrito
      createdAt: new Date()
    };
    
    reviewsList.push(newReview);
    return newReview;
  }

  // Procura uma review específica pelo ID dela (útil para atualizar/remover)
  static getById(id) {
    return reviewsList.find(review => review.id === id);
  }

  // Atualiza uma review existente
  static update(id, updatedData) {
    const index = reviewsList.findIndex(review => review.id === id);
    if (index !== -1) {
      reviewsList[index] = { 
        ...reviewsList[index], 
        ...updatedData, 
        updatedAt: new Date() 
      };
      return reviewsList[index];
    }
    return null;
  }

  // Apaga uma review pelo ID
  static delete(id) {
    const index = reviewsList.findIndex(review => review.id === id);
    if (index !== -1) {
      const deletedReview = reviewsList.splice(index, 1);
      return deletedReview[0];
    }
    return null;
  }
}

module.exports = ReviewModel;