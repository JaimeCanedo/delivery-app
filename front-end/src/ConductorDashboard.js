import React from 'react';
import './style.css'; // Puedes crear un archivo CSS personalizado

function ConductorDashboard() {
  return (
    <div className="dashboard-container">
      <h1>Panel de Conductor</h1>
      <p>Bienvenido al panel de control del conductor.</p>
      <div className="dashboard-content">
        {/* Aquí puedes agregar más contenido relacionado con el conductor */}
        <ul>
          <li>Ver mis viajes</li>
          <li>Actualizar mi vehículo</li>
          <li>Estadísticas de conducción</li>
        </ul>
      </div>
    </div>
  );
}

export default ConductorDashboard;
