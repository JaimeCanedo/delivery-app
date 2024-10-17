import { pool } from "../database/connection.js";

// Obtener todos los usuarios
const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM usuarios ORDER BY id ASC");
    return rows;
};

// Buscar un usuario por ID
const getUserById = async (id) => {
    try {
        const query = 'SELECT * FROM usuarios WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario encontrado o undefined si no existe
    } catch (error) {
        throw error;
    }
};

// Crear un nuevo usuario
const createUser = async (name, email, phone, password, user_type, value_review) => {
    try {
        const query = 'INSERT INTO usuarios (nombre, email, telefono, contraseña, tipo_usuario, puntuacion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [name, email, phone, password, user_type, value_review];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario creado
    } catch (error) {
        throw error;
    }
};

// Actualizar un usuario
const updateUser = async (id, name, email, phone, password, user_type, value_review) => {
    try {
        const query = 'UPDATE usuarios SET nombre = $1, email = $2, telefono = $3, contraseña = $4, tipo_usuario = $5, puntuacion = $6 WHERE id = $7 RETURNING *';
        const values = [name, email, phone, password, user_type, value_review, id];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario actualizado
    } catch (error) {
        throw error;
    }
};

// Eliminar un usuario
const deleteUser = async (id) => {
    try {
        const query = 'DELETE FROM usuarios WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario eliminado
    } catch (error) {
        throw error;
    }
};

export const usersModel = {
    findAll, 
    getUserById,
    createUser, 
    updateUser,
    deleteUser
};
