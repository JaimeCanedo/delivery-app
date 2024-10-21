import { ridesModel } from "../models/ridesModel.js";

const getAll = async (req, res) => {
    try {
        const response = await ridesModel.findAll();
        return res.json(response);  // Agregar return para evitar múltiples respuestas
    } catch (error) {
        console.error('Error al obtener todos los raites:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getRideById = async (req, res) => {
    const { id } = req.params;
    try {
        const raite = await ridesModel.getRideById(id);
        if (raite) {
            return res.json(raite);  // Agregar return para detener la ejecución
        } else {
            return res.status(404).json({ message: 'Raite no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar raite por ID:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const createRide = async (req, res) => {
    const { id_driver, id_vehicle, origin, destination,time ,seats_available, price_per_seat} = req.body;
    try {
        const newRide = await ridesModel.createRide(id_driver, id_vehicle, origin, destination,time ,seats_available, price_per_seat);
        return res.status(201).json(newRide);  // Retornar para detener ejecución después de la respuesta
    } catch (error) {
        console.error('Error al registrar raite:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const updateRide = async (req, res) => {
    const { id } = req.params;
    const {  origin, destination, time ,seats_available, price_per_seat} = req.body;
    try {
        const updatedRide = await ridesModel.updateRide( origin, destination, time, seats_available, price_per_seat, id );
        if (updatedRide) {
            return res.json(updatedRide);  // Retornar para evitar múltiples respuestas
        } else {
            return res.status(404).json({ message: 'Raite no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar raite por ID:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const deleteRide = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRide = await ridesModel.deleteRide(id);
        if (deletedRide) {
            return res.json({ message: 'Raite eliminado correctamente' });
        } else {
            return res.status(404).json({ message: 'Raite no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar raite por ID:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const ridesController = {
    getAll,
    getRideById, 
    createRide,
    updateRide,
    deleteRide
};
