// src/services/api.js
import axios from 'axios';

// Aquí puedes ajustar la URL base a la que apunte tu backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // URL del backend
  timeout: 10000, // Tiempo de espera en milisegundos
});

// Ejemplo de función para realizar una solicitud GET
export const obtenerDatos = async () => {
  try {
    const response = await api.get('/ruta');
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
};

// Ejemplo de función para realizar una solicitud POST
export const crearSolicitud = async (data) => {
  try {
    const response = await api.post('/solicitudes', data);
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
};

export default api;
