import { tripsModel } from "../models/tripsModel.js";

const getAll = async (req, res) => {
    try {
        const response = await tripsModel.findAll();
        return res.json(response);  // Agregar return para evitar múltiples respuestas
    } catch (error) {
        console.error('Error al obtener todos los viajes:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getTripById = async (req, res) => {
    const { id } = req.params;
    try {
        const viaje = await tripsModel.getTripById(id);
        if (viaje) {
            return res.json(viaje);  // Agregar return para detener la ejecución
        } else {
            return res.status(404).json({ message: 'Viaje no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar viaje por ID:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const createTrip = async (req, res) => {
    const { id_passenger, id_driver, id_vehicle, origin, destination, trip_type, time, price, status, driver_review, passenger_review } = req.body;
    try {
        const newTrip = await tripsModel.createTrip(id_passenger, id_driver, id_vehicle, origin, destination, trip_type, time,  price, status, driver_review, passenger_review);
        return res.status(201).json(newTrip);  // Retornar para detener ejecución después de la respuesta
    } catch (error) {
        console.error('Error al registrar viaje:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const updateTrip = async (req, res) => {
    const { id } = req.params;
    const { origin, destination, trip_type, price, status} = req.body;
    try {
        const updatedTrip = await tripsModel.updateTrip(origin, destination, trip_type, price, status, id);
        if (updatedTrip) {
            return res.json(updatedTrip);  // Retornar para evitar múltiples respuestas
        } else {
            return res.status(404).json({ message: 'Viaje no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar viaje por ID:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const deleteTrip = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTrip = await tripsModel.deleteTrip(id);
        if (deletedTrip) {
            return res.json({ message: 'Viaje eliminado correctamente' });
        } else {
            return res.status(404).json({ message: 'Viaje no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar viaje por ID:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const tripsController = {
    getAll,
    getTripById, 
    createTrip,
    updateTrip,
    deleteTrip
};
