import { pool } from "../database/connection.js";

// Obtener todos los books
const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM reservas_raites ORDER BY id ASC");
    return rows;
};

// Buscar un usuario por ID
const getBookById = async (id) => {
    try {
        const query = 'SELECT * FROM reservas_raites WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0]; 
    } catch (error) {
        throw error;
    }
};

// Crear un nuevo usuario
const createBook = async (id_ride, id_passenger, book_date, status) => {
    try {
        const query = 'INSERT INTO reservas_raites (raite_id, pasajero_id, fecha_reserva, estado) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [id_ride, id_passenger, book_date, status];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario creado
    } catch (error) {
        throw error;
    }
};

// Actualizar un usuario
const updateBook = async ( id_ride, id_passenger, book_date, status, id) => {
    try {
        const query = 'UPDATE reservas_raites SET raite_id = $1, pasajero_id = $2, fecha_reserva = $3, estado = $4 WHERE id = $5 RETURNING *';
        const values = [id_ride, id_passenger, book_date, status, id];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario actualizado
    } catch (error) {
        throw error;
    }
};

// Eliminar un usuario
const deleteBook = async (id) => {
    try {
        const query = 'DELETE FROM reservas_raites WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario eliminado
    } catch (error) {
        throw error;
    }
};

export const booksModel = {
    findAll, 
    getBookById,
    createBook, 
    updateBook,
    deleteBook
};
