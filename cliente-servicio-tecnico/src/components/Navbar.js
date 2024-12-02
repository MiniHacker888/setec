import React from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css';
import '../css/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Servicio Soporte Tecnico Digital SETEC</div>
      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/about">Quienes Somos</Link></li>
        <li><Link to="/support">Nuestros Servicios</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
