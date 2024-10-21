import { paymentsModel } from "../models/paymentsModel.js";

const getAll = async (req, res) => {
    try {
        const response = await paymentsModel.findAll();
        return res.json(response);  // Agregar return para evitar múltiples respuestas
    } catch (error) {
        console.error('Error al obtener todos los pagos:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getPaymentById = async (req, res) => {
    const { id } = req.params;
    try {
        const pago = await paymentsModel.getPaymentById(id);
        if (pago) {
            return res.json(pago);  // Agregar return para detener la ejecución
        } else {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar pago por ID:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const createPayment = async (req, res) => {
    const { id_trip, id_passenger, method_payment, total, date_payment } = req.body;
    try {
        const newPayment = await paymentsModel.createPayment( id_trip, id_passenger, method_payment, total, date_payment );
        return res.status(201).json(newPayment);  // Retornar para detener ejecución después de la respuesta
    } catch (error) {
        console.error('Error al registrar pago:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const updatePayment = async (req, res) => {
    const { id } = req.params;
    const {  method_payment, total, date_payment  } = req.body;
    try {
        const updatedPayment = await paymentsModel.updatePayment( method_payment, total, date_payment , id );
        if (updatedPayment) {
            return res.json(updatedPayment);  // Retornar para evitar múltiples respuestas
        } else {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar pago por ID:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPayment = await paymentsModel.deletePayment(id);
        if (deletedPayment) {
            return res.json({ message: 'Pago eliminado correctamente' });
        } else {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar pago por ID:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const paymentsController = {
    getAll,
    getPaymentById, 
    createPayment,
    updatePayment,
    deletePayment
};
