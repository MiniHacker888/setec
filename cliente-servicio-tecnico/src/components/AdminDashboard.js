import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/AdminDashboard.css'; // Actualiza el archivo de estilos si es necesario

const AdminDashboard = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [usuarios, setUsuarios] = useState([]); // Estado para usuarios
  const [solicitudsoporte, setSoporteTecnico] = useState([]); // Nuevo estado para solicitudes de soporte
  const [perfil, setPerfil] = useState(null);
  const [usuarioEdicion, setUsuarioEdicion] = useState(null); // Usuario seleccionado para editar
  const [editarModalVisible, setEditarModalVisible] = useState(false);

  
  // useEffect para obtener el perfil del usuario
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('No se encontró un token. El usuario debe iniciar sesión.');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/usuarios/perfil', {
          headers: { Authorization: token },
        });

        setPerfil(response.data);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error.response || error);
      }
    };

    
    fetchPerfil();
  }, []);

  // Cargar todas las solicitudes
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
  }, []);

 
  // Cargar todas las solicitudes de soporte técnico
  useEffect(() => {
    const cargarSoporteTecnico = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/solicitudsoporte', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        console.log(response.data);
        setSoporteTecnico(response.data); // Establecer las solicitudes de soporte técnico
      } catch (error) {
        console.error('Error al cargar solicitudes de soporte técnico:', error);
      }
    };
    cargarSoporteTecnico();
  }, []);


 // Cargar todos los usuarios
 useEffect(() => {
  const cargarUsuarios = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/usuarios', {
      headers: { Authorization: localStorage.getItem('token') },
    });
    console.log('Usuarios recibidos:', response.data); // Inspeccionar los datos recibidos
    setUsuarios(response.data);
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
  }
};
  cargarUsuarios();
}, []);

        
  const manejarCerrarSesion = () => {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = '/login'; // Asegúrate de que la ruta '/login' exista en tu aplicación
  };
  
 // Manejar eliminar usuario
 const handleEliminar = async (id) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
    try {
      await axios.delete(`http://localhost:5000/api/usuarios/${id}`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setUsuarios(usuarios.filter((u) => u._id !== id)); // Actualizar lista
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  }
};

// Manejar edición de usuario
const handleEditar = (usuario) => {
  setUsuarioEdicion(usuario);
  setEditarModalVisible(true); // Mostrar modal
};

const handleGuardarEdicion = async () => {
  try {
    const response = await axios.put(`http://localhost:5000/api/usuarios/${usuarioEdicion._id}`, usuarioEdicion, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    alert('Usuario actualizado correctamente.');
    setUsuarios(
      usuarios.map((u) => (u._id === usuarioEdicion._id ? response.data : u))
    );
    setEditarModalVisible(false); // Cerrar modal
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
  }
};

const handleCerrarModal = () => {
  setEditarModalVisible(false);
  setUsuarioEdicion(null);
};



  return (
    <div>

          {/* Botón de cerrar sesión */}
      <div className="logout-button-container">
        <button className="logout-button" onClick={manejarCerrarSesion}>
          Cerrar Sesión
        </button>
      </div>


      {/* Mostrar la información del perfil del administrador */}
      {perfil ? (
        <div className="perfil-usuario">
          <h3>Bienvenido, {perfil.nombre}</h3>
          <p>Email: {perfil.email}</p>
        </div>
      ) : (
        <p>Cargando perfil del usuario...</p>
      )}

      <h1>Dashboard del Administrador</h1>

<div>
      {/* Mostrar las solicitudes */}
      <h2>Solicitudes</h2>
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email Cliente</th>
            <th>Tipo Servicio</th>
            <th>Observaciones</th>
            <th>Fecha Solicitud</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((s) => (
            <tr key={s._id}>
              <td>{s.nombre}</td>
              <td>{s.direccion}</td>
              <td>{s.telefono}</td>
              <td>{s.email}</td>
              <td>{s.tipoServicio}</td>
              <td>{s.observacion}</td>
              <td>{new Date(s.fechaSolicitud).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>

    <div>

      {/* Mostrar las solicitudes de soporte técnico */}
      <h2>Solicitudes de Soporte Técnico</h2>
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>direccion</th>
            <th>telefono</th>
            <th>Email Cliente</th>
            <th>Tipo de Servicio</th>
            <th>Observaciones</th>
            <th>Valor Servicio</th>
            <th>Fecha Inicio</th>
            <th>Fecha Final</th>

          </tr>
        </thead>
        
        <tbody>
          {solicitudsoporte.map((soporte) => (
            <tr key={soporte._id}>
              <td>{soporte.nombre}</td>
              <td>{soporte.direccion}</td>
              <td>{soporte.telefono}</td>
              <td>{soporte.email}</td>
              <td>{soporte.tipoServicio}</td>
              {/*<td>{soporte.valorServicio || 'N/A'}</td>
              <td>{soporte.observaciones || 'N/A'}</td>
              <td>{soporte.fechaInicio ? new Date(soporte.fechaInicio).toLocaleDateString() : 'N/A'}</td>
              <td>{soporte.fechaFinal ? new Date(soporte.fechaFinal).toLocaleDateString() : 'N/A'}</td>
*/}

<td>{soporte.valorServicio !== undefined && soporte.valorServicio !== null ? soporte.valorServicio : 'N/A'}</td>
<td>{soporte.observaciones ? soporte.observaciones : 'N/A'}</td>
<td>{soporte.fechaInicio ? new Date(soporte.fechaInicio).toLocaleDateString() : 'N/A'}</td>
<td>{soporte.fechaFinal ? new Date(soporte.fechaFinal).toLocaleDateString() : 'N/A'}</td>
              
            </tr>
          ))}
        </tbody>

       </table>

       </div>


<div>

      {/* Mostrar los usuarios */}
      <h2>Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Editar Usuario   * || *  Eliminar Usuario</th>
            
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario._id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.role}</td>
              <td>{usuario.estado}</td>
              <td>
                <div className='edel-button'>
                  <button onClick={() => handleEditar(usuario)}>Editar</button>
                  <button onClick={() => handleEliminar(usuario._id)}>Eliminar</button>
                </div>
                </td>
            </tr>
          ))}
        </tbody>
      </table>

  </div>

{/* Modal de edición */}
{editarModalVisible && usuarioEdicion && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Usuario</h2>
            <label>
              Nombre:
              <input
                type="text"
                value={usuarioEdicion.nombre}
                onChange={(e) => setUsuarioEdicion({ ...usuarioEdicion, nombre: e.target.value })}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={usuarioEdicion.email}
                onChange={(e) => setUsuarioEdicion({ ...usuarioEdicion, email: e.target.value })}
              />
            </label>
            <label>
              Rol:
              <select
                value={usuarioEdicion.role}
                onChange={(e) => setUsuarioEdicion({ ...usuarioEdicion, role: e.target.value })}
              >
                <option value="Administrador">Administrador</option>
                <option value="Técnico">Técnico</option>
                <option value="Cliente">Cliente</option>
              </select>
            </label>
            <div className='guca-button'>
            <button onClick={handleGuardarEdicion}>Guardar</button>
            <button onClick={handleCerrarModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default AdminDashboard;
