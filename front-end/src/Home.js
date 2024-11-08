import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h1>Comparte el viaje, crea un nuevo paisaje con nuestro sitio web.</h1>
      <div className="options">
        <Link to="/login" className="button">Iniciar sesion para viajar</Link>
      </div>
    </div>
  );
}

export default Home;
