
const mongoose = require('mongoose');

// Definir el esquema primero
const solicitudSoporteSchema = new mongoose.Schema({

  /*cliente: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cliente', // Referencia al modelo Cliente
    required: true 
  },*/
  tecnico: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tecnico', // Referencia al modelo Técnico
    required: true,
  },
  nombreCliente: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  email: { // Corregido: debe coincidir con la estructura de tu controlador
    type: String,
    required: true,
  },
  tipoServicio: {
    type: String,
    required: true,
  },
  observaciones: {
    type: String,
    required: true,
  },
  valorServicio: {
    type: Number,
    required: true,
  },
  fechaInicio: {
    type: Date, 
    default: Date.now,
  },
  fechaFinal: {
    type: Date, 
    default: Date.now,
  },
});

// Registrar el modelo después de definir el esquema
const SolicitudSoporte = mongoose.models.SolicitudSoporte || mongoose.model('SolicitudSoporte', solicitudSoporteSchema, 'Tecnicos');

// Exportar el modelo
module.exports = SolicitudSoporte;
