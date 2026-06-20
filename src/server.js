require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db"); // <-- 1. Adiciona isto

const PORT = process.env.PORT || 3000;

// 2. Chama a função antes de ligar o servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger docs:  http://localhost:${PORT}/api-docs`);
  });
});
