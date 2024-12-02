import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/TecnicoDashboard.css';

const TecnicoDashboard = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [formData, setFormData] = useState({
    nombreCliente: '',
    direccion: '',
    telefono: '',
    email: '',
    tipoServicio: '',
    observaciones: '',
    valorServicio: '',
    fechaInicio: '',
    fechaFinal: ''
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

  // Cargar todas las solicitudes sin filtros
  useEffect(() => {
    const cargarSolicitudes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/solicitudes', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setSolicitudes(response.data);
      } catch (error) {
        console.error('Error al cargar solicitudes:', error);
      }
    };
    cargarSolicitudes();
  }, []); // Solo se ejecuta una vez al montar el componente

  // Manejar cambios en los campos del formulario
  const manejarCambioFormulario = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const manejarEnvioFormulario = async (e) => {
    e.preventDefault();
    console.log('Datos a enviar:', formData);

    try {
      const response = await axios.post('http://localhost:5000/api/solicitudsoporte/crear', formData);
      console.log('Respuesta del servidor:', response);

      alert('Formulario de soporte técnico enviado con éxito');
      
      // Reiniciar los campos del formulario
      setFormData({
        nombreCliente: '',
        direccion: '',
        telefono: '',
        emailcliente:'',
        tipoServicio: '',
        observaciones: '',
        valorServicio: '',
        fechaInicio: '',
        fechaFinal: ''
      });
    } catch (error) {
      console.error('Error al enviar el formulario de soporte técnico:', error);
      alert('Error al enviar el formulario');
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



      <h1>Dashboard del Técnico</h1>


      {/* Tabla de solicitudes */}
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Tipo Servicio</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email cliente</th>
            <th>Observaciones</th>
            <th>Fecha Solicitud</th>
          </tr>
        </thead>
        <tbody>
        {solicitudes.map((s) => (
            <tr key={s._id}>
              <td>{s.nombre}</td>
              <td>{s.tipoServicio}</td>
              <td>{s.direccion}</td>
              <td>{s.telefono}</td>
              <td>{s.email}</td>
              <td>{s.observacion}</td>
              <td>{new Date(s.fechaSolicitud).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario de soporte técnico */}
      <h2>Formulario de Soporte Técnico</h2>
      <form onSubmit={manejarEnvioFormulario}>
        <input
          type="text"
          name="nombreCliente"
          placeholder="Nombre Cliente"
          value={formData.nombreCliente}
          onChange={manejarCambioFormulario}
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={manejarCambioFormulario}
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={manejarCambioFormulario}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={manejarCambioFormulario}
        />
        <input
          type="text"
          name="tipoServicio"
          placeholder="Tipo de Servicio"
          value={formData.tipoServicio}
          onChange={manejarCambioFormulario}
        />
        <textarea
          name="observaciones"
          placeholder="Observaciones"
          value={formData.observaciones}
          onChange={manejarCambioFormulario}
        />
        <input
          type="number"
          name="valorServicio"
          placeholder="Valor Servicio"
          value={formData.valorServicio}
          onChange={manejarCambioFormulario}
        />
        <input
          type="date"
          name="fechaInicio"
          value={formData.fechaInicio}
          onChange={manejarCambioFormulario}
        />
        <input
          type="date"
          name="fechaFinal"
          value={formData.fechaFinal}
          onChange={manejarCambioFormulario}
        />
        <button type="submit">Enviar Soporte Técnico</button>
      </form>
    </div>
  );
};

export default TecnicoDashboard;
