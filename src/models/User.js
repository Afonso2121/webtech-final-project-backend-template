const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por favor, insere um nome"],
  },
  email: {
    type: String,
    required: [true, "Por favor, insere um email"],
    unique: true, // Não podem existir dois emails iguais
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Por favor, insere um email válido",
    ],
  },
  password: {
    type: String,
    required: [true, "Por favor, insere uma password"],
    minlength: 6,
  },
}, { timestamps: true });

// Magia: Encriptar a password antes de guardar na Base de Dados
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Função para comparar a password no momento do login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);