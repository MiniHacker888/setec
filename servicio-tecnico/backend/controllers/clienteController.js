const Cliente = require('../models/cliente');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Función para generar JWT
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
};

// Obtener todos los clientes
exports.getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Registro de cliente
exports.register = async (req, res) => {
    const { nombre, email, password, role = 'cliente' } = req.body; // Asignar rol 'cliente' por defecto
    try {
        const existingCliente = await Cliente.findOne({ email });
        if (existingCliente) {
            return res.status(400).json({ message: 'El email ya está registrado.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoCliente = new Cliente({ nombre, email, password: hashedPassword, role });
        await nuevoCliente.save();
        res.status(201).json({ message: 'Cliente registrado exitosamente', cliente: nuevoCliente });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Inicio de sesión de cliente
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const cliente = await Cliente.findOne({ email });
        if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });

        const isMatch = await bcrypt.compare(password, cliente.password);
        if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

        const token = generateToken(cliente._id, cliente.role); // Generar el token con rol incluido
        res.json({ token, cliente: { ...cliente._doc, password: undefined } }); // Retornar cliente sin la contraseña
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
