
// models/Solicitud.js
/*const mongoose = require('mongoose');

// Definir el esquema de Solicitud
const solicitudSchema = new mongoose.Schema({
  cliente: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cliente', // Referencia al modelo Cliente
    required: true 
  },
  /*tecnico: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tecnico' // Referencia al modelo Tecnico
  },*/
 /* usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },*/
/*
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
 
});

// Exportar el modelo, asegurándonos de que no se redefina
module.exports = mongoose.models.Solicitud || mongoose.model('Solicitud', solicitudSchema, 'Solicitudes');
*/


const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
  nombreCliente: { 
    type: String, 
    required: true 
  }, // Nombre del cliente
  direccion: { 
    type: String, 
    required: true 
  }, // Dirección del cliente
  telefono: { 
    type: String, 
    required: true 
  }, // Teléfono del cliente
  email: { 
    type: String, 
    required: true 
  }, // Email del cliente
  tipoServicio: { 
    type: String, 
    required: true,
    enum: ['Instalación', 'Reparación', 'Soporte'] 
  }, // Tipo de servicio solicitado
  observaciones: { 
    type: String, 
    required: true 
  }, // Descripción o detalles del servicio
  valorServicio: { 
    type: Number 
  }, // Valor estimado del servicio (opcional)
  fechaInicio: { 
    type: Date, 
    default: Date.now 
  }, // Fecha en la que se inicia la solicitud
  fechaFinal: { 
    type: Date 
  }, // Fecha estimada de finalización (opcional)
  tecnicoAsignado: { 
    type: String, 
    default: null 
  }, // Nombre o ID del técnico asignado
  estado: { 
    type: String, 
    default: 'Pendiente', 
    enum: ['Pendiente', 'En proceso', 'Finalizada'] 
  }, // Estado de la solicitud
}, { timestamps: true });

module.exports = mongoose.models.Solicitud || mongoose.model('Solicitud', solicitudSchema);
