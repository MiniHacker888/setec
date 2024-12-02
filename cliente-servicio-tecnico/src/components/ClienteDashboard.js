import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ClienteDashboard.css';

function ClienteDashboard() {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    tipoServicio: '',
    observacion: '',
    fechaSolicitud: '',
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
  });

  // Estado para el perfil del usuario
  const [perfil, setPerfil] = useState(null);

  // useEffect para obtener el perfil del usuario
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        // Obtener el token del almacenamiento local
        const token = localStorage.getItem('token'); 
        if (!token) {
          console.warn('No se encontró un token. El usuario debe iniciar sesión.');
          return;
        }

        // Solicitar el perfil del usuario al backend
        const response = await axios.get('http://localhost:5000/api/usuarios/perfil', {
          headers: { Authorization: token }, // Enviar el token en el encabezado
        });

        // Almacenar los datos del perfil en el estado
        setPerfil(response.data);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error.response || error);
      }
    };

    fetchPerfil(); // Llamada a la función al montar el componente
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos a enviar:', formData);

    try {
      const response = await axios.post('http://localhost:5000/api/solicitudes/crear', formData);
      console.log('Respuesta del servidor:', response);
      alert('Solicitud de servicio enviada exitosamente');

      // Reiniciar los campos del formulario
      setFormData({
        tipoServicio: '',
        observacion: '',
        fechaSolicitud: '',
        nombre: '',
        direccion: '',
        telefono: '',
        email: '',
      });
    } catch (error) {
      console.error('Error al enviar la solicitud:', error.response || error);
      alert('Error al enviar la solicitud. Por favor, intente de nuevo.');
    }
  };

  const manejarCerrarSesion = () => {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = '/login'; // Asegúrate de que la ruta '/login' exista en tu aplicación
  };
  


  return (
    <div>

         {/* Botón de cerrar sesión */}
      <div className="logout-button-container">
        <button className="logout-button" onClick={manejarCerrarSesion}>
          Cerrar Sesión
        </button>
      </div>


      {/* Mostrar la información del perfil del usuario */}
      {perfil ? (
        <div className="perfil-usuario">
          <h3>Bienvenido, {perfil.nombre}</h3>
          <p>Email: {perfil.email}</p>
        </div>
      ) : (
        <p>Cargando perfil del usuario...</p>
      )}

      <h2>Formulario de Solicitud de Servicio</h2>
      <form onSubmit={handleSubmit}>
        
      <div>
          <label>Nombre del Cliente:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Tipo de Servicio:</label>
          <select
            name="tipoServicio"
            value={formData.tipoServicio}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un tipo de servicio</option>
            <option value="soporte">Soporte</option>
            <option value="instalacion">Instalación</option>
            <option value="reparacion">Reparación</option>
          </select>
        </div>

        <div>
          <label>Observación:</label>
          <textarea
            name="observacion"
            value={formData.observacion}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div>
          <label>Fecha de Solicitud:</label>
          <input
            type="date"
            name="fechaSolicitud"
            value={formData.fechaSolicitud}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Teléfono:</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email del Cliente:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Enviar Solicitud</button>
      </form>
    </div>
  );
}

export default ClienteDashboard;
