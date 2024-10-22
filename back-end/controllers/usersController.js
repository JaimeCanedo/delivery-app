import { usersModel } from "../models/usersModel.js";
import { authUser } from '../models/usersModel.js';

const getAll = async (req, res) => {
    try {
        const response = await usersModel.findAll();
        return res.json(response);  // Agregar return para evitar múltiples respuestas
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const loginUser = async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await authUser(name, password);

        if (user) {
            const tipoUsuario = user.tipo_usuario;

            // Redirigir según el tipo de usuario
            if (tipoUsuario === 'conductor') {
                return res.redirect('/conductor-dashboard');
            } else if (tipoUsuario === 'pasajero') {
                return res.redirect('/pasajero-dashboard');
            } else {
                return res.status(400).send('Tipo de usuario no reconocido');
            }
        } else {
            return res.status(401).send('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error en el servidor');
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usersModel.getUserById(id);
        if (usuario) {
            return res.json(usuario);  // Agregar return para detener la ejecución
        } else {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar usuario por ID:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const createUser = async (req, res) => {
    const { name, email, phone, password, user_type, value_review } = req.body;
    try {
        const newUser = await usersModel.createUser(name, email, phone, password, user_type, value_review);
        return res.status(201).json(newUser);  // Retornar para detener ejecución después de la respuesta
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, password, user_type, value_review } = req.body;
    try {
        const updatedUser = await usersModel.updateUser(id, name, email, phone, password, user_type, value_review);
        if (updatedUser) {
            return res.json(updatedUser);  // Retornar para evitar múltiples respuestas
        } else {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar usuario por ID:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await usersModel.deleteUser(id);
        if (deletedUser) {
            return res.json({ message: 'Usuario eliminado correctamente' });
        } else {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar usuario por ID:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const usersController = {
    getAll,
    loginUser,
    getUserById, 
    createUser,
    updateUser,
    deleteUser
};
