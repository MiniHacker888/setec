import React from 'react';
import '../css/support.css'; // Asegúrate de que este archivo CSS esté en la carpeta correcta
import '../css/home.css';


const Support = () => {
  return (
    <div>
    <div className="support-container">
      <div className="support-content">
        <h1>Soporte Técnico</h1>
        <p>
          ¿Tienes un problema? Nuestro equipo está listo para ayudarte con cualquier solicitud técnica.
        </p>
        <p>
          Ofrecemos una variedad de servicios de soporte para garantizar el correcto funcionamiento de tus equipos y sistemas:
        </p>
        <ul>
          <li><strong>Instalación de equipos:</strong> Realizamos la instalación profesional de hardware y software.</li>
          <li><strong>Reparación de sistemas:</strong> Diagnóstico y reparación de equipos y sistemas informáticos.</li>
          <li><strong>Soporte remoto y presencial:</strong> Brindamos asistencia en sitio o de forma remota según lo requieras.</li>
        </ul>
      </div>
      </div>
      {/* Pie de página con copyright */}
      <footer className="footer">
          <p>&copy; {new Date().getFullYear()} - Todos los derechos reservados.</p>
          <p>Servicio de Soporte Técnico Digital - SETEC. Dirección: Santiago de Cali, Valle del Cauca. Teléfono: 315 503 1564</p>
        <p>2024</p>
      </footer>
    </div>
  );
};

export default Support;
