import React, { useState } from 'react';
import LocationSelector from './LocationSelector';
import "./estilos/style.css";

function PasajeroDashboard() {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Viaja a cualquier lugar</h2>
        <p>Selecciona tu ubicación de inicio y destino para ver la ruta en el mapa.</p>
        <LocationSelector />

        <div className="inputs">
          <label>Fecha</label>
          <input type="date" />

          <label>Hora</label>
          <input type="time" />
        </div>

        <button className="price-button">Ver precios</button>
      </div>
    </div>
  );
}

export default PasajeroDashboard;
