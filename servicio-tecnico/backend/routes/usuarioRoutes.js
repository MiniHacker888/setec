const express = require('express');
const router = express.Router();
const { register, login, getPerfil, bloquearUsuario, eliminarUsuario } = require('../controllers/usuarioController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const usuarioController = require('../controllers/usuarioController');


const Usuario = require('../models/usuario');

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
      const usuarios = await Usuario.find(); // Verifica que `Usuario` sea tu modelo correcto
      res.json(usuarios);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'No se pudieron obtener los usuarios' });
    }
  });

// DELETE /api/usuarios/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndDelete(id); // Asegúrate de usar el modelo correcto
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado con éxito', usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});

// PUT /api/usuarios/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, role, estado } = req.body;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { nombre, email, role, estado },
      { new: true }
    );

    if (!usuarioActualizado) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario actualizado con éxito', usuario: usuarioActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});



// Rutas para usuario
router.post('/register', register); // Registro
router.post('/login', login); // Inicio de sesión
router.get('/perfil', auth, authorize(['admin', 'cliente', 'tecnico']), getPerfil); // Obtener perfil
router.get('/', usuarioController.listarUsuarios);
router.patch('/bloquear/:id', auth, authorize(['admin']), bloquearUsuario); // Bloquear usuario
router.delete('/:id', auth, authorize(['admin']), eliminarUsuario); // Eliminar usuario




module.exports = router;
