// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo.jpeg';
import "./estilos/style.css"

function Navbar() {
    return (
      <nav className="navbar" >
        <div className="navbar-logo">
        <img src={logo} width={80} alt="Logo" className="logo" />
        </div>
        <ul className="navbar-links">
          <li><a href="#viaja">Viaja</a></li>
          <li><a href="#conduce">Conduce</a></li>
          <li><a href="#empresas">Empresas</a></li>
          <li><a href="#uber-eats">Uber Eats</a></li>
        </ul>
        <div className="navbar-buttons">
          <a href="login" className="navbar-login">Inicia sesión</a>
          <a href="register" className="navbar-register">Regístrate</a>
        </div>
      </nav>
    );
  }
  
  export default Navbar;