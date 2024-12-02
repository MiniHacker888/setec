import { useState, React } from 'react';
import axios from 'axios';
import '../css/home.css';
import '../css/contact.css';

const Contact = () => {

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const [respuesta, setRespuesta] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contacto', formData);
      setRespuesta('Mensaje enviado con éxito.');
      setFormData({ nombre: '', email: '', mensaje: '' });
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setRespuesta('Hubo un error al enviar el mensaje. Inténtalo más tarde.');
    }
  };

  return (
    <div className="contact-container">
      <h1>Contáctanos</h1>
      <p>Si tienes alguna pregunta o comentario, no dudes en enviarnos un mensaje.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            id="nombre"
            type="text"
            placeholder="Tu nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Tu correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="mensaje"
            placeholder="Tu mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Enviar</button>
      </form>
      {respuesta && <p className="response-message">{respuesta}</p>}
    
      <footer className="footer">
          <p>&copy; {new Date().getFullYear()} - Todos los derechos reservados.</p>
          <p>Servicio de Soporte Técnico Digital - SETEC. Dirección: Santiago de Cali, Valle del Cauca. Teléfono: 315 503 1564</p>
        <p>2024</p>
      </footer>
    
    </div>
  );
};

export default Contact;