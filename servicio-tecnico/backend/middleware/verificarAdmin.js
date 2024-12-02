/*const verificarAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      return next(); // Si es administrador, permite el siguiente middleware o la ruta
    } else {
      return res.status(403).json({ mensaje: 'No tiene permisos de administrador' }); // Si no es admin, rechaza la solicitud
    }
  };
  
  module.exports = verificarAdmin;
  */

  const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).json({ message: 'No token provided.' });
    }
  
    // Verificar el token (ejemplo con JWT)
    jwt.verify(token, 'secret-key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized access.' });
      }
      req.user = decoded; // Guardar el usuario decodificado en la solicitud
      next();
    });
  };
  
  // Aplicar middleware en rutas protegidas
  app.get('/api/solicitudsoporte', verifyToken, (req, res) => {
    // Lógica de la ruta
  });
  