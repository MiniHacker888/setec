
const mongoose = require('mongoose');

const solicitudSoporteSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true,
  },
  tipoServicio: {
    type: String,
    required: true,
    enum: ['Instalación', 'Reparación', 'Soporte'],
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
    required: true,
  },
});

// Usa el modelo existente si ya está registrado
const SolicitudSoporte =
  mongoose.models.SolicitudSoporte || mongoose.model('SolicitudSoporte', solicitudSoporteSchema);

module.exports = SolicitudSoporte;
