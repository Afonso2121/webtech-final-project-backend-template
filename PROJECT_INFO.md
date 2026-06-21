# Project Information

## Group Members
* **Student 1:** Ulysse Cancela
* **Student 2:** Ana Matos
* **Student 3:** Afonso Sousa

## Project Theme
CineTrack - Plataforma web para pesquisa de filmes, gestão de coleções de filmes favoritos e sistema de críticas/avaliações (reviews) partilhadas entre utilizadores.

## External API Used
* **API name:** TMDB (The Movie Database)
* **API link:** https://developer.themoviedb.org/docs
* **Requires API key?** Yes

## Frontend Repository
* **Link:** [Inserir aqui o link do GitHub onde a Ana tem o projeto Angular]

## Entities
Na nossa Base de Dados (MongoDB) temos as seguintes entidades:
* **User** (Utilizadores: nome, email, password encriptada)
* **Favorite** (Favoritos: ligação entre o ID do Utilizador e o ID do Filme da API externa)
* **Review** (Críticas: ligação entre o Utilizador e o Filme, incluindo uma nota numérica e um comentário)

## Main Features
* Sistema de Autenticação seguro com registo, login e geração de tokens JWT.
* Pesquisa e visualização de catálogo de filmes (via API externa).
* Adição e remoção de filmes à lista pessoal de "Favoritos" de cada utilizador.
* Criação, edição e remoção de classificações (notas) e críticas (reviews) a filmes.
* Rotas protegidas (apenas utilizadores logados podem interagir com favoritos e reviews).

## Endpoints
* `POST /api/auth/register` - Regista um novo utilizador
* `POST /api/auth/login` - Autentica o utilizador e devolve o token JWT
* `POST /api/favorites` - Adiciona um filme aos favoritos do utilizador logado
* `GET /api/favorites` - Lista todos os favoritos do utilizador logado
* `DELETE /api/favorites/:id` - Remove um filme dos favoritos
* `POST /api/reviews` - Adiciona uma review/nota a um filme
* `PUT /api/reviews/:id` - Atualiza a review/nota de um filme
* `DELETE /api/reviews/:id` - Apaga uma review existente

## Notes
**Declaração de uso de IA:** A Inteligência Artificial foi utilizada como ferramenta de apoio em quase todo o processo de desenvolvimento do nosso projeto, auxiliando ativamente na estruturação do código, resolução de erros e documentação, não havendo partes em que o seu uso tenha sido ocultado.
