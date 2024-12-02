import React from 'react';
import '../css/home.css';
import '../css/about.css'; // Asegúrate de tener un archivo CSS para estilizar la página

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>Sobre Nosotros</h1>
        <p>
          <strong>Historia:</strong> Somos una empresa líder en servicios técnicos desde 2005, comprometidos con la calidad y la innovación en cada proyecto. Nos especializamos en ofrecer soporte rápido y eficiente, utilizando las tecnologías más avanzadas.
        </p>
        <p>
          <strong>Misión:</strong> Brindar soluciones técnicas confiables, rápidas y accesibles a través de múltiples canales. Nuestro equipo altamente capacitado está siempre disponible para resolver cualquier inconveniente de forma remota o en sitio.
        </p>
        <p>
          <strong>Visión:</strong> Ser reconocidos a nivel nacional como la empresa más innovadora en el sector de servicios técnicos, mejorando continuamente nuestra capacidad de respuesta mediante la automatización y el uso de herramientas de inteligencia artificial.
        </p>
        <p>
          <strong>Metas:</strong> Expandir nuestros servicios a nivel internacional, optimizando el proceso de solicitud de soporte técnico en tiempo real, mediante el uso de plataformas digitales interactivas que facilitan la comunicación entre nuestros clientes y el equipo técnico.
        </p>
      </div>

      <div className="service-section">
        <h2>Solicitud de Servicio Técnico en Tiempo Real</h2>
        <p>
          Ofrecemos un sistema de solicitud de servicio técnico en tiempo real, donde puedes recibir atención instantánea a través de múltiples plataformas:
        </p>
        <ul>
          <li><strong>Soporte en vivo:</strong> Conéctate con nuestros técnicos en tiempo real a través de chat en vivo en nuestra plataforma.</li>
          <li><strong>Asistencia remota:</strong> Permite a nuestros expertos acceder a tu dispositivo de manera remota para diagnosticar y resolver problemas sin necesidad de desplazamientos.</li>
          <li><strong>Seguimiento en tiempo real:</strong> Realiza un seguimiento de tu solicitud desde la apertura hasta la resolución, con actualizaciones instantáneas sobre el estado de tu caso.</li>
        </ul>
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

export default About;
