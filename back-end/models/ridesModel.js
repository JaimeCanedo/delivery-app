import { pool } from "../database/connection.js";

// Obtener todos los rides
const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM raites ORDER BY id ASC");
    return rows;
};

// Buscar un usuario por ID
const getRideById = async (id) => {
    try {
        const query = 'SELECT * FROM raites WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0]; 
    } catch (error) {
        throw error;
    }
};

// Crear un nuevo usuario
const createRide = async (id_driver, id_vehicle, origin, destination,time ,seats_available, price_per_seat) => {
    try {
        const query = 'INSERT INTO raites (conductor_id, vehiculo_id, origen, destino, fecha_hora_salida, asientos_disponibles, costo_por_asiento) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [id_driver, id_vehicle, origin, destination,time ,seats_available, price_per_seat];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario creado
    } catch (error) {
        throw error;
    }
};

// Actualizar un usuario
const updateRide = async ( origin, destination, time ,seats_available, price_per_seat, id) => {
    try {
        const query = 'UPDATE raites SET origen = $1, destino = $2, fecha_hora_salida = $3, asientos_disponibles = $4, costo_por_asiento = $5 WHERE id = $6 RETURNING *';
        const values = [origin, destination,time ,seats_available, price_per_seat, id];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario actualizado
    } catch (error) {
        throw error;
    }
};

// Eliminar un usuario
const deleteRide = async (id) => {
    try {
        const query = 'DELETE FROM raites WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario eliminado
    } catch (error) {
        throw error;
    }
};

export const ridesModel = {
    findAll, 
    getRideById,
    createRide, 
    updateRide,
    deleteRide
};
