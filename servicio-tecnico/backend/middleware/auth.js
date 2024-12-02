const jwt = require('jsonwebtoken');

// Middleware para verificar el token
const auth = (req, res, next) => {
  // Obtén el token de la cabecera Authorization (en formato 'Bearer <token>')
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' }); // Si no hay token, error 401
  }

  try {
    // Verifica y decodifica el token
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret'); // Asegúrate de tener la clave secreta en el archivo .env
    req.user = verified; // Guarda los datos del usuario decodificado
    next(); // Continúa con la siguiente función (el controlador)
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' }); // Si el token es inválido, error 400
  }
};

module.exports = auth;
