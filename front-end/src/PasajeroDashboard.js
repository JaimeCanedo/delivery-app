import React from 'react';
import './estilos/style.css'; // Puedes crear un archivo CSS personalizado

function PasajeroDashboard() {
  return (
    <div className="dashboard-container">
      <h1>Panel de Pasajero</h1>
      <p>Bienvenido al panel de control del pasajero.</p>
      <div className="dashboard-content">
        {/* Aquí puedes agregar más contenido relacionado con el pasajero */}
        <ul>
          <li>Ver mis reservas</li>
          <li>Historial de viajes</li>
          <li>Actualizar mi perfil</li>
        </ul>
      </div>
    </div>
  );
}

export default PasajeroDashboard;
