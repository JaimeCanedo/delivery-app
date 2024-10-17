import { vehiclesModel } from "../models/vehiclesModel.js";

const getAll = async (req, res) => {
    try {
        const response = await vehiclesModel.findAll();
        return res.json(response);  // Agregar return para evitar múltiples respuestas
    } catch (error) {
        console.error('Error al obtener todos los vehiculos:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getVehicleById = async (req, res) => {
    const { id } = req.params;
    try {
        const vehiculo = await vehiclesModel.getVehicleById(id);
        if (vehiculo) {
            return res.json(vehiculo);  // Agregar return para detener la ejecución
        } else {
            return res.status(404).json({ message: 'Vehiculo no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar vehiculo por ID:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const createVehicle = async (req, res) => {
    const { name, email, phone, password, user_type, value_review } = req.body;
    try {
        const newVehicle = await vehiclesModel.createVehicle(name, email, phone, password, user_type, value_review);
        return res.status(201).json(newVehicle);  // Retornar para detener ejecución después de la respuesta
    } catch (error) {
        console.error('Error al registrar vehiculo:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const updateVehicle = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, password, user_type, value_review } = req.body;
    try {
        const updatedVehicle = await vehiclesModel.updateVehicle(id, name, email, phone, password, user_type, value_review);
        if (updatedVehicle) {
            return res.json(updatedVehicle);  // Retornar para evitar múltiples respuestas
        } else {
            return res.status(404).json({ message: 'Vehiculo no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar vehiculo por ID:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const deleteVehicle = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedVehicle = await vehiclesModel.deleteVehicle(id);
        if (deletedVehicle) {
            return res.json({ message: 'Vehiculo eliminado correctamente' });
        } else {
            return res.status(404).json({ message: 'Vehiculo no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar vehiculo por ID:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const vehiclesController = {
    getAll,
    getVehicleById, 
    createVehicle,
    updateVehicle,
    deleteVehicle
};
