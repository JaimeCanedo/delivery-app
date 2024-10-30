import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Importa tu archivo CSS personalizado

function LoginForm() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    phone: '',
    user_type: '',
  });
  const [isLogin, setIsLogin] = useState(true); // Estado para controlar si está en modo login o registro
  const navigate = useNavigate(); // Hook para navegar entre rutas

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/users';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (isLogin && data.user_type) {
          // Redirigir según el tipo de usuario
          if (data.user_type === 'conductor') {
            navigate('/conductor-dashboard'); // Redirige a la página del conductor
          } else if (data.user_type === 'pasajero') {
            navigate('/pasajero-dashboard'); // Redirige a la página del pasajero
          }
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="form-container">
      <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Número Celular:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="user_type">Tipo de Usuario:</label>
              <select
                id="user_type"
                name="user_type"
                value={formData.user_type}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                <option value="conductor">Conductor</option>
                <option value="pasajero">Pasajero</option>
              </select>
            </div>
          </>
        )}
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Iniciar' : 'Registrarse'}</button>
      </form>
      <p>
        {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
        <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
          {isLogin ? ' Registrarse' : ' Iniciar Sesión'}
        </span>
      </p>
    </div>
  );
}

export default LoginForm;
