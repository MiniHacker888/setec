
// Función para crear una nueva solicitud
const SolicitudSoporte = require('../models/solicitudSoporteModel');
const Tecnico = require('../models/tecnico')

// Crear una nueva solicitud de soporte
exports.crearSolicitudSoporte = async (req, res) => {
  try {
    // Crear una nueva instancia de la solicitud con los datos del formulario
    const nuevaSolicitud = new SolicitudSoporte({
      nombreCliente: req.body.nombreCliente,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
      email: req.body.email,
      tipoServicio: req.body.tipoServicio,
      observaciones: req.body.observaciones,
      valorServicio: req.body.valorServicio,
      fechaInicio: req.body.fechaInicio,
      fechaFinal: req.body.fechaFinal
    });

    // Guardar la solicitud en la base de datos
    const solicitudGuardada = await nuevaSolicitud.save();
    res.status(201).json({
      message: 'Solicitud de soporte creada con éxito',
      data: solicitudGuardada
    });
  } catch (error) {
    console.error('Error al crear la solicitud:', error);
    res.status(500).json({
      message: 'Error al crear la solicitud',
      error: error.message
    });
  }
};


// Función para obtener todas las solicitudes
exports.getSolicitudesSoporte = async (req, res) => {
  try {
    const solicitudes = await SolicitudSoporte.find();
    res.status(200).json(solicitudes);
  } catch (error) {
    console.error('Error al obtener solicitudes:', error);
    res.status(500).json({
      message: 'Error al obtener solicitudes',
      error: error.message
    });
  }
};

// Función para obtener una solicitud específica por ID
exports.getSolicitudSoporteById = async (req, res) => {
  try {
    const solicitud = await SolicitudSoporte.findById(req.params.id);
    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }
    res.status(200).json(solicitud);
  } catch (error) {
    console.error('Error al obtener solicitud por ID:', error);
    res.status(500).json({
      message: 'Error al obtener solicitud por ID',
      error: error.message
    });
  }
};
