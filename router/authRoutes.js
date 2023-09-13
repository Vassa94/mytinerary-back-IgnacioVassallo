import express from 'express';
import Joi from 'joi'; 
import authController from '../controllers/authController.js';

const authRoutes = express.Router();

// Define un esquema de validación con Joi para el registro
const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
    photo: Joi.string().required(),
    ciudad: Joi.string().required(),
    pais: Joi.string().required(),
});

authRoutes.post('/signup', authController.signup);
authRoutes.post('/signin', authController.signin);
authRoutes.get('/logout', (req, res) => {
    // Implementa la lógica de cierre de sesión aquí
    // Esto puede incluir la eliminación de la información de autenticación (token) o la invalidación de sesiones, dependiendo de tu enfoque de autenticación.
    // Por ejemplo, si utilizas JWT, puedes simplemente dejar que el token expire y no realizar ninguna acción específica en el servidor.
    // En caso de utilizar sesiones, puedes destruir la sesión del usuario.
    return res.json({ message: 'Logged out successfully' });
});

export default authRoutes;