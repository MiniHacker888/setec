// routes/cliente.js
const express = require('express');
const router = express.Router();
const { register, login, getClientes } = require('../controllers/clienteController');

router.post('/register', register);
router.post('/loging', login);
router.get('/', getClientes);

module.exports = router;
