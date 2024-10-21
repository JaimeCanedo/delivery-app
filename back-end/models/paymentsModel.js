import { pool } from "../database/connection.js";

// Obtener todos los payments
const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM pagos ORDER BY id ASC");
    return rows;
};

// Buscar un usuario por ID
const getPaymentById = async (id) => {
    try {
        const query = 'SELECT * FROM pagos WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0]; 
    } catch (error) {
        throw error;
    }
};

// Crear un nuevo usuario
const createPayment = async (id_trip, id_passenger, method_payment, total, date_payment) => {
    try {
        const query = 'INSERT INTO pagos (viaje_id, pasajero_id, metodo_pago, monto, fecha_pago) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [id_trip, id_passenger, method_payment, total, date_payment];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario creado
    } catch (error) {
        throw error;
    }
};

// Actualizar un usuario
const updatePayment = async ( method_payment, total, date_payment, id) => {
    try {
        const query = 'UPDATE pagos SET  metodo_pago = $1, monto = $2, fecha_pago = $3 WHERE id = $4 RETURNING *';
        const values = [method_payment, total, date_payment, id];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario actualizado
    } catch (error) {
        throw error;
    }
};

// Eliminar un usuario
const deletePayment = async (id) => {
    try {
        const query = 'DELETE FROM pagos WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];  // Retorna el usuario eliminado
    } catch (error) {
        throw error;
    }
};

export const paymentsModel = {
    findAll, 
    getPaymentById,
    createPayment, 
    updatePayment,
    deletePayment
};
