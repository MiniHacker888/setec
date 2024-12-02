const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config(); // Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tuservicio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then(() => console.log('MongoDB conectado correctamente'))
  .catch((err) => console.error('Error al conectar con MongoDB:', err));

// Definición de esquemas y modelos
const solicitudSoporteSchema = new mongoose.Schema({
  nombreCliente: String,
  direccion: String,
  telefono: String,
  email: String,
  tipoServicio: String,
  observaciones: String,
  valorServicio: Number,
  fechaInicio: Date,
  fechaFinal: Date,
});

const SolicitudSoporte =
  mongoose.models.SolicitudSoporte || mongoose.model('SolicitudSoporte', solicitudSoporteSchema);

const solicitudSchema = new mongoose.Schema({
  tipoServicio: String,
  observacion: String,
  fechaSolicitud: Date,
  nombre: String,
  direccion: String,
  telefono: String,
  email: String,
});

const Solicitud =
  mongoose.models.Solicitud || mongoose.model('Solicitud', solicitudSchema);


// Configuración de rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const tecnicoRoutes = require('./routes/tecnicoRoutes');
const solicitudRoutes = require('./routes/solicitudRoutes');
const solicitudSoporteRoutes = require('./routes/solicitudsoporteRoutes');
/*const administradorRoutes = require('./routes/administradorRoutes');*/
const contactoRoutes = require('./routes/contacto');

// Registro de rutas
app.use('/api/usuarios', usuarioRoutes); // Rutas de usuario
app.use('/api/clientes', clienteRoutes); // Rutas de cliente
app.use('/api/tecnicos', tecnicoRoutes); // Rutas de técnico
app.use('/api/solicitudes', solicitudRoutes); // Rutas para solicitudes
app.use('/api/solicitudsoporte', solicitudSoporteRoutes); // Rutas para soporte técnico
/*app.use('/api/administrador', administradorteRoutes); // Rutas para administrador*/
app.use('/api/contacto', contactoRoutes);

// Ruta para crear solicitudes directamente
app.post('/api/solicitudes/crear', async (req, res) => {
  try {
    const nuevaSolicitud = new Solicitud(req.body);
    const solicitudGuardada = await nuevaSolicitud.save();
    res.status(201).json({
      message: 'Solicitud creada exitosamente',
      data: solicitudGuardada,
    });
  } catch (error) {
    console.error('Error al crear la solicitud:', error);
    res.status(500).json({
      message: 'Error al crear la solicitud',
      error: error.message,
    });
  }
});


// Ruta para guardar formularios de soporte técnico
app.post('/api/solicitudsoporte/crear', async (req, res) => {
  try {
    const nuevaSolicitudSoporte = new SolicitudSoporte(req.body);
    await nuevaSolicitudSoporte.save();
    res.status(201).json({ message: 'Formulario de soporte técnico enviado con éxito' });
  } catch (error) {
    console.error('Error al guardar la solicitud de soporte:', error);
    res.status(500).json({
      message: 'Error al guardar la solicitud de soporte técnico',
      error: error.message,
    });
  }
});

// Definir la ruta para obtener los técnicos
app.get('/api/tecnicos', (req, res) => {
  // Aquí puedes devolver los datos de los técnicos, por ejemplo
  const tecnicos = [
    { id: 1, nombre: 'Juan Pérez', experiencia: '5 años' },
    { id: 2, nombre: 'Ana García', experiencia: '3 años' }
  ];
  res.json(tecnicos);  // Devuelve los técnicos como JSON
});


// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API corriendo...');
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
