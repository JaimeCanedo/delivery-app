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
    const { driver_id, brand, model, year, vehicle_number, vehicle_type, passenger_capacity } = req.body;
    try {
        const newVehicle = await vehiclesModel.createVehicle(driver_id, brand, model, year, vehicle_number, vehicle_type, passenger_capacity);
        return res.status(201).json(newVehicle);  // Retornar para detener ejecución después de la respuesta
    } catch (error) {
        console.error('Error al registrar vehiculo:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const updateVehicle = async (req, res) => {
    const { id } = req.params;
    const { brand, model, year, vehicle_number, vehicle_type, passenger_capacity } = req.body;
    try {
        const updatedVehicle = await vehiclesModel.updateVehicle(brand, model, year, vehicle_number, vehicle_type, passenger_capacity, id);
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
