const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Web Technologies Final Project API",
      version: "1.0.0",
      description: "API documentation for the final project backend",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Development server",
      },
    ],
    // Centralizamos os caminhos das rotas aqui para evitar erros de YAML nos ficheiros de código
    paths: {
      "/api/auth/register": {
        post: {
          summary: "Regista um novo utilizador",
          tags: ["Autenticação"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "Ulysse Cancela" },
                    email: { type: "string", example: "ulysse@ipvc.pt" },
                    password: { type: "string", example: "123456" }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: "Utilizador registado com sucesso!" }
          }
        }
      },
      "/api/auth/login": {
        post: {
          summary: "Autentica um utilizador (Login)",
          tags: ["Autenticação"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: { type: "string", example: "ulysse@ipvc.pt" },
                    password: { type: "string", example: "123456" }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: "Login efetuado com sucesso!" },
            401: { description: "Credenciais inválidas." }
          }
        }
      },
      "/api/reviews": {
        post: {
          summary: "Criar uma nova review (Issue 10)",
          tags: ["Reviews"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    movieId: { type: "string", example: "1" },
                    userId: { type: "string", example: "123456" },
                    rating: { type: "integer", example: 5 },
                    comment: { type: "string", example: "Filme absolutamente fantástico!" }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: "Review criada com sucesso!" }
          }
        }
      },
      "/api/reviews/{id}": {
        put: {
          summary: "Editar uma review existente (Issue 11)",
          tags: ["Reviews"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "ID da review a editar"
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    rating: { type: "integer", example: 4 },
                    comment: { type: "string", example: "Filme muito bom, mudei para 4 estrelas." }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: "Review atualizada com sucesso!" }
          }
        },
        delete: {
          summary: "Remover uma review (Issue 12)",
          tags: ["Reviews"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "ID da review a remover"
            }
          ],
          responses: {
            200: { description: "Review removida com sucesso!" }
          }
        }
      }
    }
  },
  apis: [], // Deixamos vazio para ler apenas a nossa definição limpa acima
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;