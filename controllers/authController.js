import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import secretKey from '../config/token.js';
import bcrypt from 'bcrypt';



const authController = {
    signup: async (req, res, next) => {
        try {
            const { email, password, photo, nombre, apellido,  pais } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10); 
            const newUser = new User({
                email,
                password: hashedPassword,
                photo,
                nombre,
                apellido,
                pais,
            });
            await newUser.save();
            return res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            return next(error);
        }
    },

    signin: (req, res, next) => {
        console.log("Body de la solicitud:", req.body);
        passport.authenticate('local', { session: false }, async (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                return res.status(401).json({ message: err });
            }
            try {
                const token = jwt.sign({ id: user._id }, secretKey);
                return res.json({ token, user: { id: user._id, email: user.email, /* otros campos del usuario */ } });
            } catch (error) {
                return next(error);
            }
        })(req, res, next);
    },
};

export default authController;
