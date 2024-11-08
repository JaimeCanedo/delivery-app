import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./estilos/style.css"

function ConductorDashboard() {
  const location = useLocation();
  const driver_id = location.state?.driver_id;
  const [vehicles, setVehicles] = useState([]);
  const [vehicleData, setVehicleData] = useState({
    brand: '',
    model: '',
    year: '',
    vehicle_number: '',
    vehicle_type: '',
    passenger_capacity: ''
  });

  useEffect(() => {
    if (!driver_id) {
      console.error('No se recibió un driver_id');
      return;
    }

    const fetchVehicles = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/check-vehicle/${driver_id}`);
        if (!response.ok) {
          throw new Error("Error al verificar el vehículo");
        }
        const data = await response.json();
        setVehicles(data.vehicles || []);
      } catch (error) {
        console.error("Error al verificar el vehículo:", error);
      }
    };

    fetchVehicles();
  }, [driver_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: value,
    });
  };

  const handleSubmitVehicle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/Vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...vehicleData, driver_id }), // Incluye driver_id en los datos
      });

      if (!response.ok) {
        throw new Error("Error al registrar el vehículo");
      }

      const newVehicle = await response.json();
      setVehicles([...vehicles, newVehicle]); // Actualiza la lista de vehículos
      setVehicleData({ marca: '', modelo: '', anio: '' }); // Limpia el formulario

    } catch (error) {
      console.error("Error al registrar el vehículo:", error);
    }
  };

  const renderVehicleForm = () => (
    <div className="form-container">
    <form onSubmit={handleSubmitVehicle}  >
      <h2>Registra un nuevo vehículo</h2>
      <div className="form-group"> 
      <label>
        Marca:
        <input
          type="text"
          name="brand"
          value={vehicleData.brand}
          onChange={handleInputChange}
          required
        />
      </label>
      </div>
      <div className="form-group"> 
      <label>
        Modelo:
        <input
          type="text"
          name="model"
          value={vehicleData.model}
          onChange={handleInputChange}
          required
        />
      </label>
      </div>
      <div className="form-group"> 
      <label>
        Año:
        <input
          type="number"
          name="year"
          value={vehicleData.year}
          onChange={handleInputChange}
          required
        />
      </label>
      </div>
      <div className="form-group"> 
      <label>
        Placa:
        <input
          type="text"
          name="vehicle_number"
          value={vehicleData.vehicle_number}
          onChange={handleInputChange}
          required
        />
      </label>
      </div>
      <div className="form-group"> 
      <label>
        Tipo vehiculo:
        <input
          type="text"
          name="vehicle_type"
          value={vehicleData.vehicle_type}
          onChange={handleInputChange}
          required
        />
      </label>
      </div>
      <div className="form-group"> 
      <label>
        Capacidad de asientos:
        <input
          type="number"
          name="passenger_capacity"
          value={vehicleData.passenger_capacity}
          onChange={handleInputChange}
          required
        />
      </label>
      </div>
      <button type="submit">Registrar Vehículo</button>
    </form>
    </div>
  );

  return (
    <div className="dashboard-container">
      <h1>Panel de Conductor</h1>
      {vehicles.length === 0 ? (
        <>
          <p>No tienes ningún vehículo registrado. Por favor, registra uno para comenzar a ofrecer tus servicios.</p>
          {renderVehicleForm()} {/* Muestra el formulario solo si no hay vehículos */}
        </>
      ) : (
        <>
          <p>Tienes los siguientes vehículos registrados:</p>
          <ul>
            {vehicles.map((vehicle, index) => (
              <li key={index}>
                Marca: {vehicle.marca} | Modelo: {vehicle.modelo} | Año: {vehicle.año} | Placa: {vehicle.placa} | Tipo: {vehicle.tipo_vehiculo}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ConductorDashboard;
