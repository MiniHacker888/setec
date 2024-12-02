// backend/routes/tecnicoRoutes.js
const express = require('express');
const router = express.Router();

// Importa las funciones del controlador
const { register, login, obtenerSolicitudes, crearSolicitud } = require('../controllers/tecnicoController');

// Definir las rutas y asociarlas con los controladores
router.post('/register', register);           // Ruta para registro
router.post('/login', login);                 // Ruta para login
router.get('/solicitudes', obtenerSolicitudes); // Ruta para obtener solicitudes
//router.post('/solicitudes', crearSolicitud);  // Ruta para crear una nueva solicitud
router.post('/soporte-tecnico', crearSolicitud);

module.exports = router;
