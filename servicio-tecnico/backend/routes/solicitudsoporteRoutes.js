/*const express = require('express');
const router = express.Router();

const { obtenerSolicitudes } = require('../controllers/solicitudController');

// Asegúrate de que el controlador esté bien importado
const solicitudSoporteController = require('../controllers/solicitudSoporteController');

// Ruta para crear una nueva solicitud de soporte técnico
router.post('/soporte-tecnico', solicitudSoporteController.crearSolicitudSoporte);

router.get('/solicitudes', obtenerSolicitudes);

module.exports = router;
*/

// routes/solicitudRoutes.js
/*const express = require('express');
const {
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
router.get('/', verificarToken, obtenerSolicitudes);
router.put('/actualizar/:id', verificarToken, actualizarSolicitud);
router.put('/asignar/:solicitudId', verificarToken, asignarTecnico);
router.delete('/eliminar/:id', verificarToken, eliminarSolicitud);
router.post('/soporte-tecnico', registrarSolicitud);  // Asegúrate de que esté definida correctamente

module.exports = router;
*/


const express = require('express');
const solicitudController = require('../controllers/solicitudController');
const solicitudSoporteController = require('../controllers/solicitudSoporteController'); // Importa el controlador correcto
const verificarToken = require('../middleware/auth'); 

const router = express.Router();

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

module.exports = router;