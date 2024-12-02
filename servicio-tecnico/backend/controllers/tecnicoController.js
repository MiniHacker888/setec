// backend/controllers/tecnicoController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Tecnico = require('../models/tecnico');
const Solicitud = require('../models/solicitud'); // Asegúrate de tener este modelo bien configurado
const SolicitudSoporte = require('../models/solicitudSoporteModel');

// Secreto para el JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Registro de técnico
exports.register = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        const existingTecnico = await Tecnico.findOne({ email });
        if (existingTecnico) {
            return res.status(400).json({ message: 'El email ya está registrado.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoTecnico = new Tecnico({ nombre, email, password: hashedPassword, role: 'tecnico' });

        await nuevoTecnico.save();
        res.status(201).json({ message: 'Registro exitoso', tecnico: nuevoTecnico });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Inicio de sesión de técnico
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const tecnico = await Tecnico.findOne({ email });
        if (!tecnico) return res.status(404).json({ message: 'Técnico no encontrado' });

        const isMatch = await bcrypt.compare(password, tecnico.password);
        if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: tecnico._id, role: tecnico.role }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, tecnico: { ...tecnico._doc, password: undefined } });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Listar solicitudes
exports.obtenerSolicitudes = async (req, res) => {
    const { nombre, tipoServicio, fechaSolicitud } = req.query;

    try {
        const filtro = {};
        if (nombre) filtro.nombreCliente = { $regex: nombre, $options: 'i' };
        if (tipoServicio) filtro.tipoServicio = tipoServicio;
        if (fechaSolicitud) filtro.fechaSolicitud = fechaSolicitud;

        const solicitudes = await Solicitud.find(filtro);
        res.json(solicitudes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Crear una nueva solicitud
exports.crearSolicitud = async (req, res) => {
    const { nombreCliente, direccion, telefono, email, tipoServicio, observaciones, valorServicio, fechaInicio, fechaFinal } = req.body;

    try {
        const nuevaSolicitud = new Solicitud({
            nombreCliente,
            direccion,
            telefono,
            email,
            tipoServicio,
            observaciones,
            valorServicio,
            fechaInicio,
            fechaFinal
        });

        await nuevaSolicitud.save();
        res.status(201).json({ message: 'Solicitud creada exitosamente', solicitud: nuevaSolicitud });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



  exports.crearSolicitudSoporte = async (req, res) => {
    try {
      const nuevaSolicitud = new SolicitudSoporte({
        nombreCliente: req.body.nombreCliente,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email,
        tipoServicio: req.body.tipoServicio,
        observaciones: req.body.observaciones,
        valorServicio: req.body.valorServicio,
        fechaInicio: req.body.fechaInicio,
        fechaFinal: req.body.fechaFinal,
      });
  
      const solicitudGuardada = await nuevaSolicitud.save();
      res.status(201).json({
        message: 'Solicitud creada exitosamente',
        data: solicitudGuardada,
      });
    } catch (error) {
      console.error('Error al crear la solicitud:', error);
      res.status(500).json({ message: 'Error al crear la solicitud', error: error.message });
    }
  };
  

