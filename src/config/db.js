const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Base de Dados ligada com sucesso: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erro ao ligar à Base de Dados: ${error.message}`);
    process.exit(1); // Para o servidor se não conseguir ligar
  }
};

module.exports = connectDB;