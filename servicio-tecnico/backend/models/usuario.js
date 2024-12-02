const mongoose = require('mongoose');

// Definición del esquema de usuario
const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['cliente', 'tecnico', 'admin'], default: 'cliente' },
  estado: { type: String, enum: ['Activo', 'Bloqueado'], default: 'Activo' },
}, { timestamps: true });

// Asignar el modelo de usuario a una constante
const Usuario = mongoose.model('Usuario', usuarioSchema, 'Usuarios');

// Exportar el modelo
module.exports = Usuario;
