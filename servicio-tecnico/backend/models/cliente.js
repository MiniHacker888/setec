const mongoose = require('mongoose');

// Definir el esquema para el cliente
const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'cliente' },
});

// Verificar si el modelo ya está registrado antes de crearlo
const Cliente = mongoose.models.Cliente || mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
