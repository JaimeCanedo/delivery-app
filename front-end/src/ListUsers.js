import React, { useEffect, useState } from 'react';
import './style.css'

function UserList() {
  const [users, setUsers] = useState([]);

  // Función para obtener los usuarios del backend
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      setUsers(data); // Guardamos los usuarios en el estado
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  // Usamos useEffect para obtener los usuarios cuando el componente se monta
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" >Lista de Usuarios</h2>
      <ul className="list-group">
        {users.length === 0 ? (
          <li className="list-group-item">No hay usuarios disponibles</li>
        ) : (
          users.map((user) => (
            <li key={user._id} className="list-group-item">
              {user.nombre} - {user.email} - {user.telefono}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default UserList;
