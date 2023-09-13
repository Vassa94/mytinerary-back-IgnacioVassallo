import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import secretKey from './token.js';
import User from '../models/userModel.js';

passport.use(new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password'
},
    async (email, password, done) => {
        try {
            console.log("Se busca: " + email);
            const user = await User.findOne({ email });
            if (!user) return done(null, false); // Usuario no encontrado
            const isValidPassword = await user.isValidPassword(password);
            if (!isValidPassword) return done(null, false);
            console.log(isValidPassword) // Contraseña incorrecta
            return done(null, user); // Usuario autenticado correctamente
        } catch (error) {
            return done(error);
        }
    }
));

// Configurar la estrategia de autenticación JWT
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey 
},
    async (jwtPayload, done) => {
        try {
            const user = await User.findById(jwtPayload.id);
            if (!user) return done(null, false); // Usuario no encontrado
            return done(null, user); // Usuario autenticado correctamente
        } catch (error) {
            return done(error);
        }
    }
));
