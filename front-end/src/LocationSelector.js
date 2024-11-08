// src/LocationSelector.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import "./estilos/style.css";

// Configuración de estilo para el mapa
const mapStyle = {
  height: "500px",
  width: "100%",
};

// Crear iconos personalizados para los marcadores de inicio y destino
const startIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const endIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function LocationSelector() {
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);

  // Manejador de clics en el mapa
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        if (!startLocation) {
          setStartLocation(e.latlng);
        } else if (!endLocation) {
          setEndLocation(e.latlng);
        }
      },
    });
    return null;
  };

  // Simular una solicitud de viaje
  const handleRequestRide = () => {
    if (startLocation && endLocation) {
      alert(`¡Viaje solicitado!\nDesde: ${startLocation.lat.toFixed(4)}, ${startLocation.lng.toFixed(4)}\nHasta: ${endLocation.lat.toFixed(4)}, ${endLocation.lng.toFixed(4)}`);
    } else {
      alert("Por favor selecciona ambas ubicaciones.");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Selecciona Ubicaciones de Inicio y Destino</h2>
      <p>Haz clic en el mapa para seleccionar tu ubicación de inicio y destino.</p>

      <MapContainer center={[38.8951, -77.0364]} zoom={13} style={mapStyle}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <MapClickHandler />

        {startLocation && (
          <Marker position={startLocation} icon={startIcon}>
            <Popup>Inicio: {startLocation.lat.toFixed(4)}, {startLocation.lng.toFixed(4)}</Popup>
          </Marker>
        )}
        {endLocation && (
          <Marker position={endLocation} icon={endIcon}>
            <Popup>Destino: {endLocation.lat.toFixed(4)}, {endLocation.lng.toFixed(4)}</Popup>
          </Marker>
        )}
      </MapContainer>

      <div className="location-summary">
        <h3>Resumen del Viaje</h3>
        <p><strong>Inicio:</strong> {startLocation ? `${startLocation.lat.toFixed(4)}, ${startLocation.lng.toFixed(4)}` : "No seleccionado"}</p>
        <p><strong>Destino:</strong> {endLocation ? `${endLocation.lat.toFixed(4)}, ${endLocation.lng.toFixed(4)}` : "No seleccionado"}</p>
      </div>

      <div className="button-container">
        <button onClick={() => setStartLocation(null)}>Reiniciar Inicio</button>
        <button onClick={() => setEndLocation(null)}>Reiniciar Destino</button>
        <button onClick={handleRequestRide}>Solicitar Viaje</button>
      </div>
    </div>
  );
}

export default LocationSelector;
