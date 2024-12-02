// routes/solicitudRoutes.js
/*const express = require('express');
const {
  listarSolicitudes,
  crearSolicitud,
  obtenerSolicitudes,
  asignarTecnico,
  actualizarSolicitud,
  eliminarSolicitud,
  registrarSolicitud,  // Asegúrate de que registrarSolicitud esté importada aquí
} = require('../controllers/solicitudController');



const verificarToken = require('../middleware/auth'); // Middleware para autenticar al usuario
const router = express.Router();

// Rutas para Solicitudes
router.post('/', verificarToken, crearSolicitud);
router.get('/', verificarToken, obtenerSolicitudes, listarSolicitudes);
router.put('/actualizar/:id', verificarToken, actualizarSolicitud);
router.put('/asignar/:solicitudId', verificarToken, asignarTecnico);
router.delete('/eliminar/:id', verificarToken, eliminarSolicitud);
router.post('/soporte-tecnico', registrarSolicitud);  // Asegúrate de que esté definida correctamente

module.exports = router;
*/
/*
const express = require('express');
const solicitudController = require('../controllers/solicitudController');
const solicitudSoporteController = require('../controllers/solicitudSoporteController'); // Importa el controlador correcto
const verificarToken = require('../middleware/auth'); 

// const router = express.Router();

// Rutas para solicitudes de clientes
router.post('/', verificarToken, solicitudController.crearSolicitud);
router.get('/', verificarToken, solicitudController.obtenerSolicitudes);
router.put('/actualizar/:id', verificarToken, solicitudController.actualizarSolicitud);
router.put('/asignar/:solicitudId', verificarToken, solicitudController.asignarTecnico);
router.delete('/eliminar/:id', verificarToken, solicitudController.eliminarSolicitud);

// Rutas para solicitudes de soporte técnico
router.post('/soporte-tecnico', verificarToken, solicitudSoporteController.crearSolicitudSoporte);
router.get('/soporte-tecnico', verificarToken, solicitudSoporteController.getSolicitudesSoporte);
router.get('/soporte-tecnico/:id', verificarToken, solicitudSoporteController.getSolicitudSoporteById);

module.exports = router;*/


const express = require('express');
const solicitudController = require('../controllers/solicitudController'); // Controlador para solicitudes generales
const solicitudSoporteController = require('../controllers/solicitudSoporteController'); // Controlador para soporte técnico
const verificarToken = require('../middleware/auth'); // Middleware para autenticación

const router = express.Router();

// ==== RUTAS PARA SOLICITUDES DE CLIENTES ====
router.post('/', verificarToken, solicitudController.crearSolicitud); // Crear una solicitud
router.get('/', verificarToken, solicitudController.obtenerSolicitudes); // Obtener todas las solicitudes
router.put('/actualizar/:id', verificarToken, solicitudController.actualizarSolicitud); // Actualizar solicitud
/*router.put('/asignar/:id', verificarToken, async (req, res) => { // Ruta personalizada para asignar técnico
  const { tecnico } = req.body;
  try {
    const solicitud = await Solicitud.findById(req.params.id);

    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    if (solicitud.tecnicoAsignado) {
      return res.status(400).json({ message: 'La solicitud ya está asignada a un técnico.' });
    }

    solicitud.tecnicoAsignado = tecnico;
    solicitud.estado = 'En proceso';
    await solicitud.save();

    res.status(200).json({ message: 'Técnico asignado con éxito', solicitud });
  } catch (error) {
    res.status(500).json({ message: 'Error al asignar técnico', error });
  }
});
*/

router.put('/solicitudes/asignar/:idSolicitud', async (req, res) => {
  const { idSolicitud } = req.params;
  const { tecnico } = req.body;

  try {
    const solicitud = await Solicitud.findById(idSolicitud);

    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    solicitud.tecnico = tecnico; // Asignar el técnico
    await solicitud.save(); // Guardar cambios

    return res.status(200).json({ message: 'Técnico asignado exitosamente', solicitud });
  } catch (error) {
    console.error('Error al asignar técnico:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});



router.delete('/eliminar/:id', verificarToken, solicitudController.eliminarSolicitud); // Eliminar solicitud

// ==== RUTAS PARA SOLICITUDES DE SOPORTE TÉCNICO ====
router.post('/soporte-tecnico', verificarToken, solicitudSoporteController.crearSolicitudSoporte); // Crear solicitud de soporte
router.get('/soporte-tecnico', verificarToken, solicitudSoporteController.getSolicitudesSoporte); // Obtener todas las solicitudes de soporte
router.get('/soporte-tecnico/:id', verificarToken, solicitudSoporteController.getSolicitudSoporteById); // Obtener solicitud específica

module.exports = router;
