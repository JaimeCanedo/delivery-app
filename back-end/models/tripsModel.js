import { pool } from "../database/connection.js";

// Obtener todos los viajes
const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM viajes ORDER BY id ASC");
    return rows;
};

// Buscar un usuario por ID
const getTripById = async (id) => {
    try {
        const query = 'SELECT * FROM viajes WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario encontrado o undefined si no existe
    } catch (error) {
        throw error;
    }
};

// Crear un nuevo usuario
const createTrip = async (id_passenger, id_driver, id_vehicle, origin, destination, trip_type, time, price, status, driver_review, passenger_review) => {
    try {
        const query = 'INSERT INTO viajes (pasajero_id, conductor_id, vehiculo_id, origen, destino, tipo_viaje, fecha_hora_inicio, costo, estado, calificacion_piloto, calificacion_pasajero) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
        const values = [id_passenger, id_driver, id_vehicle, origin, destination, trip_type, time, price, status, driver_review, passenger_review];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario creado
    } catch (error) {
        throw error;
    }
};

// Actualizar un usuario
const updateTrip = async (origin, destination, trip_type, price, status, id) => {
    try {
        const query = 'UPDATE viajes SET origen = $1, destino = $2, tipo_viaje = $3, costo = $4, estado = $5 WHERE id = $6 RETURNING *';
        const values = [ origin, destination, trip_type, price, status, id];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario actualizado
    } catch (error) {
        throw error;
    }
};

// Eliminar un usuario
const deleteTrip = async (id) => {
    try {
        const query = 'DELETE FROM viajes WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario eliminado
    } catch (error) {
        throw error;
    }
};

export const tripsModel = {
    findAll, 
    getTripById,
    createTrip, 
    updateTrip,
    deleteTrip
};
