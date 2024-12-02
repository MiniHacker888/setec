

// src/pages/Home.js
import React from 'react';
import '../css/home.css'; // Asegúrate de tener un archivo CSS para estilizar la página
import img1 from '../img/des1.jpg';
import img2 from '../img/des3.jpg';
import img3 from '../img/des2.jpg';

const Home = () => {
  return (
    <div className="home-container">
      <div className="overlay">
        <h1>Bienvenido al Sistema de Solicitud de Servicio Técnico</h1>
        <p>¡Tu solución está a un clic de distancia!</p>

        {/* Enlaces centrados */}
        <div className="links">
          <a href="/login">Iniciar Sesión</a>
          <a href="/register">Registrarse</a>
        </div>
      </div>

      {/* Imágenes */}
      <div className="images">

      <img src={img1} alt="Imagen 1" />
      <img src={img2} alt="Imagen 2" />
      <img src={img3} alt="Imagen 3" />

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

export default Home;
