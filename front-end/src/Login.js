import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './estilos/login.css'; 

function LoginForm() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    phone: '',
    user_type: '',
  });
  const [isLogin, setIsLogin] = useState(true); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      .then(response => response.ok ? response.json() : Promise.reject('Usuario o contraseña incorrectos'))
      .then(data => {
        console.log("Respuesta del servidor:", data);

        if (isLogin && data.tipo_usuario) {
          if (data.tipo_usuario === 'conductor') {
            console.log("redirigiendo a conductor:", data.tipo_usuario);
            navigate('/conductor-dashboard', { state: { driver_id: data.id } });
          } else if (data.tipo_usuario === 'pasajero') {
            console.log("redirigiendo a pasajero:", data.tipo_usuario);
            navigate('/pasajero-dashboard');
          } else {
            setError("Tipo de usuario no reconocido");
          }
        } else if (!isLogin) {
          setIsLogin(true);
          setError("Registro exitoso, ahora puedes iniciar sesión");
        }
      })
      .catch(error => setError(error));
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
      <p>{error && <span className="error">{error}</span>}</p>
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
