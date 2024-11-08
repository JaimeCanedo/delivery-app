import { pool } from "../database/connection.js";

// Obtener todos los vehiculos
const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM vehiculos ORDER BY id ASC");
    return rows;
};

// Buscar un usuario por ID
const getVehicleById = async (id) => {
    try {
        const query = 'SELECT * FROM vehiculos WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario encontrado o undefined si no existe
    } catch (error) {
        throw error;
    }
};

// Crear un nuevo usuario
const createVehicle = async (driver_id, brand, model, year, vehicle_number, vehicle_type, passenger_capacity) => {
    try {
        const query = 'INSERT INTO vehiculos (conductor_id , marca, modelo, año, placa, tipo_vehiculo, capacidad_asientos) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [driver_id, brand, model, year, vehicle_number, vehicle_type, passenger_capacity];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario creado
    } catch (error) {
        throw error;
    }
};

// Actualizar un usuario
const updateVehicle = async (brand, model, year, vehicle_number, vehicle_type, passenger_capacity, id) => {
    try {
        const query = 'UPDATE vehiculos SET marca = $1, modelo = $2, año = $3, placa = $4, tipo_vehiculo = $5, capacidad_asientos = $6 WHERE id = $7 RETURNING *';
        const values = [brand, model, year, vehicle_number, vehicle_type, passenger_capacity, id];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario actualizado
    } catch (error) {
        throw error;
    }
};

// Eliminar un usuario
const deleteVehicle = async (id) => {
    try {
        const query = 'DELETE FROM vehiculos WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario eliminado
    } catch (error) {
        throw error;
    }
};

const getVehicleByDriverId = async (conductor_id) => {
    try {
        console.log("Ejecutando consulta para driver_id:", conductor_id);
        const query = 'SELECT * FROM vehiculos WHERE conductor_id = $1';
        const values = [conductor_id];
        const result = await pool.query(query, values);
        console.log("Resultado de la consulta:", result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error en getVehicleByDriverId:', error);
        throw error;
    }
};

export const vehiclesModel = {
    findAll, 
    getVehicleById,
    createVehicle, 
    updateVehicle,
    deleteVehicle,
    getVehicleByDriverId,
};
