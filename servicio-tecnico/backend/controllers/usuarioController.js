const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Función para generar el token JWT
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
};

// Función para registrar un nuevo usuario
const register = async (req, res) => {
  const { nombre, email, password, role } = req.body;

  try {
      // Verifica si el usuario ya existe
      const existingUser = await Usuario.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'El email ya está registrado.' });
      }

      // Hashea la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crea un nuevo usuario
      const nuevoUsuario = new Usuario({
          nombre,
          email,
          password: hashedPassword,
          role,
      });

      // Guarda el usuario en la base de datos
      const savedUser = await nuevoUsuario.save();

      res.status(201).json({
          message: 'Usuario registrado exitosamente',
          usuario: { ...savedUser._doc, password: undefined },
      });
  } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ message: 'Error en el registro.' });
  }
};

// Función para iniciar sesión
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
          return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      const isMatch = await bcrypt.compare(password, usuario.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Contraseña incorrecta.' });
      }

      const token = generateToken(usuario);
      res.status(200).json({ token, usuario: { ...usuario._doc, password: undefined } });
  } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error en el inicio de sesión.' });
  }
};

// Bloquear usuario
const bloquearUsuario = async (req, res) => {
  try {
      const { id } = req.params; // ID del usuario a bloquear
      const usuario = await Usuario.findByIdAndUpdate(
          id,
          { estado: 'Bloqueado' }, // Cambiar el estado a "Bloqueado"
          { new: true } // Devuelve el documento actualizado
      );

      if (!usuario) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.status(200).json({ message: 'Usuario bloqueado exitosamente', usuario });
  } catch (error) {
      console.error('Error al bloquear usuario:', error);
      res.status(500).json({ error: 'Error al bloquear usuario.' });
  }
};

 // Eliminar usuario
const eliminarUsuario = async (req, res) => {
  try {
      const { id } = req.params; // ID del usuario a eliminar
      const usuario = await Usuario.findByIdAndDelete(id); // Busca y elimina el usuario por ID

      if (!usuario) {
          return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
  } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ message: 'Error al eliminar usuario.' });
  }
};

  

  // **Controlador: Obtener Perfil del Usuario**
const getPerfil = async (req, res) => {
  try {
    const userId = req.user.id; // `auth.js` añade `req.user` después de validar el token
    const usuario = await Usuario.findById(userId).select('-password'); // Excluir la contraseña

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.status(200).json({
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      role: usuario.role,
    });
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};



// Listar usuarios con filtro opcional
const listarUsuarios = async (req, res) => {
  const { nombre, email, role, estado } = req.query;

  try {
    // Construir el filtro dinámico
    const filtro = {};
    if (nombre) filtro.nombre = { $regex: nombre, $options: 'i' }; // Búsqueda insensible a mayúsculas/minúsculas
    if (email) filtro.email = email;
    if (role) filtro.role = role;
    if (estado) filtro.estado = estado;

    // Obtener la lista de usuarios según el filtro
    const usuarios = await Usuario.find(filtro).select('-password'); // Excluir contraseña en la respuesta
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error al listar usuarios:', error);
    res.status(500).json({ message: 'Error al listar usuarios.' });
  }
};

// Función para actualizar un usuario
const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, role } = req.body;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { nombre, email, role },
      { new: true } // Esto devuelve el documento actualizado
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario actualizado exitosamente', usuario: usuarioActualizado });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};


module.exports = {
  register,
  login,
  getPerfil,
  bloquearUsuario,  // No olvides agregar estas funciones si planeas utilizarlas.
  eliminarUsuario,
  listarUsuarios,
  actualizarUsuario,
};