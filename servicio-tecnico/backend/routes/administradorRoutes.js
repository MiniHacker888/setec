const express = require('express');
const administradorController = require('../controllers/administradorController');
const solicitudSoporteController = require('../controllers/solicitudSoporteController'); // Importa el controlador correcto
const verificarToken = require('../middleware/auth'); 

const router = express.Router();

// Rutas para solicitudes de clientes
router.post('/', verificarToken, administradorController.administrador);
router.get('/', verificarToken, administradorController.administrador);
router.put('/actualizar/:id', verificarToken, administradorController.administrador);
router.put('/asignar/:solicitudId', verificarToken, administradorController.administrador);
router.delete('/eliminar/:id', verificarToken, administradorController.administrador);

// Rutas para solicitudes de soporte técnico
router.post('/soporte-tecnico', verificarToken, solicitudSoporteController.crearSolicitudSoporte);
router.get('/soporte-tecnico', verificarToken, solicitudSoporteController.getSolicitudesSoporte);
router.get('/soporte-tecnico/:id', verificarToken, solicitudSoporteController.getSolicitudSoporteById);

module.exports = router;