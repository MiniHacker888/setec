const Solicitud = require('../models/solicitud');
const SolicitudSoporte = require('../models/solicitudSoporteModel'); 
const Cliente = require('../models/cliente');
const Tecnico = require('../models/tecnico');



// Función para crear una solicitud
const crearSolicitud = async (req, res) => {
  try {
    const {
      clienteId,  // Identificación del cliente existente
      direccion,
      telefono,
      email,
      tipoServicio,
      observacion,  // Campo opcional para observaciones
      fechaSolicitud,
    } = req.body;

    console.log("Datos recibidos:", req.body); // Verificar los datos recibidos en la consola

    // Validar si el cliente existe
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    // Crear la nueva solicitud
    const nuevaSolicitud = new Solicitud({
      cliente: clienteId,
      direccion,
      telefono,
      email,
      tipoServicio,
      observacion,
      fechaSolicitud,
    });

    await nuevaSolicitud.save(); // Guardar en la base de datos
    res.status(201).json({ mensaje: 'Solicitud creada con éxito', solicitud: nuevaSolicitud });
  } catch (error) {
    console.error("Error en crearSolicitud:", error.message);
    res.status(500).json({ mensaje: 'Error al crear la solicitud', error: error.message });
  }
};



// Función para listar todas las solicitudes
const listarSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.find()
      .populate('cliente tecnico') // Traer información referenciada
      .populate('tecnico', 'nombre')
      .exec();
    res.status(200).json(solicitudes); // Respuesta al cliente
  } catch (error) {
    console.error('Error al listar solicitudes:', error);
    res.status(500).json({ message: 'Error al listar solicitudes', error });
  }
};





// Función para obtener todas las solicitudes

const obtenerSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.find();
    res.status(200).json(solicitudes); // Devolver las solicitudes como respuesta JSON
  } catch (error) {
    console.error('Error al obtener solicitudes:', error);
    res.status(500).json({ message: 'Error al obtener solicitudes' });
  }
};





// Función para actualizar una solicitud
const actualizarSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const { estadoEquipo, observacion } = req.body;

    const solicitud = await Solicitud.findById(id);
    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    // Actualizar solo los campos permitidos
    solicitud.estadoEquipo = estadoEquipo || solicitud.estadoEquipo;
    solicitud.observacion = observacion || solicitud.observacion;

    await solicitud.save();
    res.status(200).json({ mensaje: 'Solicitud actualizada con éxito', solicitud });
  } catch (error) {
    console.error("Error al actualizar la solicitud:", error.message);
    res.status(500).json({ error: 'Error al actualizar la solicitud', message: error.message });
  }
};

// Función para eliminar una solicitud
const eliminarSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const solicitud = await Solicitud.findByIdAndDelete(id);

    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    res.status(200).json({ mensaje: 'Solicitud eliminada con éxito' });
  } catch (error) {
    console.error("Error al eliminar la solicitud:", error.message);
    res.status(500).json({ error: 'Error al eliminar la solicitud', message: error.message });
  }
};

// Función para asignar un técnico a una solicitud
const asignarTecnico = async (req, res) => {
  try {
    const { tecnicoId } = req.body;
    const { solicitudId } = req.params;

    // Verificar que el técnico existe
    const tecnico = await Tecnico.findById(tecnicoId);
    if (!tecnico) {
      return res.status(404).json({ error: 'Técnico no encontrado' });
    }

    // Actualizar la solicitud asignándole el técnico
    const solicitud = await Solicitud.findByIdAndUpdate(
      solicitudId,
      { tecnico: tecnicoId, estado: 'En proceso' },
      { new: true }
    ).populate('cliente tecnico');

    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    res.status(200).json({ mensaje: 'Técnico asignado con éxito', solicitud });
  } catch (error) {
    console.error("Error al asignar técnico:", error.message);
    res.status(500).json({ error: 'Error al asignar técnico', message: error.message });
  }
};



// Función para registrar una solicitud de soporte
const registrarSolicitud = async (req, res) => {
  const { nombreCliente, direccion, telefono, email, tipoServicio, observaciones, valorServicio, fechaInicio, fechaFinal } = req.body;

  try {
    const nuevaSolicitud = new SolicitudSoporte({
      nombreCliente,
      direccion,
      telefono,
      email,
      tipoServicio,
      observaciones,
      valorServicio,
      fechaInicio,
      fechaFinal,
      fechaSolicitud: new Date()  // Establece la fecha de solicitud al momento de la creación
    });

    await nuevaSolicitud.save();
    res.status(201).json({ message: 'Solicitud registrada exitosamente' });
  } catch (error) {
    console.error('Error al registrar solicitud:', error);
    res.status(500).json({ message: 'Error al registrar solicitud' });
  }
};

// Exportar todas las funciones, incluyendo registrarSolicitud
module.exports = {
  listarSolicitudes,
  crearSolicitud,
  obtenerSolicitudes,
  actualizarSolicitud,
  eliminarSolicitud,
  asignarTecnico,
  registrarSolicitud  // Asegúrate de que registrarSolicitud esté aquí
  
};