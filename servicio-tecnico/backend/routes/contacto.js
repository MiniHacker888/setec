const express = require('express');
const router = express.Router();
const Contacto = require('../models/Contacto');

// Ruta para guardar un mensaje de contacto
router.post('/', async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const nuevoContacto = new Contacto({ nombre, email, mensaje });
    await nuevoContacto.save();

    res.status(201).json({ message: 'Mensaje enviado con éxito' });
  } catch (error) {
    console.error('Error al guardar mensaje de contacto:', error);
    res.status(500).json({ error: 'Hubo un problema al enviar el mensaje' });
  }
});

module.exports = router;
