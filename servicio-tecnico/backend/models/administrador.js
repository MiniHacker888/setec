
// models/Solicitud.js
const mongoose = require('mongoose');

// Definir el esquema de Solicitud
const administradorSchema = new mongoose.Schema({
  cliente: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cliente', // Referencia al modelo Cliente
    required: true 
  },
  tecnico: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tecnico' // Referencia al modelo Tecnico
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  tipoServicio: { 
    type: String, 
    required: true 
  },
  nombreCliente: { 
    type: String, 
    required: true 
  },
  observaciones: { 
    type: String, 
    required: true 
  }, // Observaciones generales del servicio
  fechaSolicitud: { 
    type: Date, 
    default: Date.now 
  },
  direccion: { 
    type: String 
  }, // Opcional, útil para solicitudes de servicios a domicilio
  telefono: { 
    type: String 
  },  // Opcional, número de teléfono del cliente
  email: { // Asegúrate de que este campo esté correctamente escrito
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
  nombre: { 
    type: String, 
    required: true 
},
  email: {
     type: String, 
     required: true, 
     unique: true 
    },
  role: {
     type: String, 
     enum: ['cliente', 'tecnico', 'admin'], 
     default: 'cliente' 
    },
  estado: { type: String, 
    enum: ['Activo', 'Bloqueado'], 
    default: 'Activo' 
},



});

// Exportar el modelo, asegurándonos de que no se redefina
module.exports = mongoose.models.Administrador || mongoose.model('Admin', AdministradorSchema, 'Administrador');
