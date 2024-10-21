import { booksModel } from "../models/booksModel.js";

const getAll = async (req, res) => {
    try {
        const response = await booksModel.findAll();
        return res.json(response);  // Agregar return para evitar múltiples respuestas
    } catch (error) {
        console.error('Error al obtener todos los reservas:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const reserva = await booksModel.getBookById(id);
        if (reserva) {
            return res.json(reserva);  // Agregar return para detener la ejecución
        } else {
            return res.status(404).json({ message: 'Reserva no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar reserva por ID:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const createBook = async (req, res) => {
    const { id_ride, id_passenger, book_date, status } = req.body;
    try {
        const newBook = await booksModel.createBook( id_ride, id_passenger, book_date, status );
        return res.status(201).json(newBook);  // Retornar para detener ejecución después de la respuesta
    } catch (error) {
        console.error('Error al registrar reserva:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const updateBook = async (req, res) => {
    const { id } = req.params;
    const { id_ride, id_passenger, book_date, status  } = req.body;
    try {
        const updatedBook = await booksModel.updateBook( id_ride, id_passenger, book_date, status , id );
        if (updatedBook) {
            return res.json(updatedBook);  // Retornar para evitar múltiples respuestas
        } else {
            return res.status(404).json({ message: 'Reserva no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar reserva por ID:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await booksModel.deleteBook(id);
        if (deletedBook) {
            return res.json({ message: 'Reserva eliminado correctamente' });
        } else {
            return res.status(404).json({ message: 'Reserva no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar reserva por ID:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const booksController = {
    getAll,
    getBookById, 
    createBook,
    updateBook,
    deleteBook
};
