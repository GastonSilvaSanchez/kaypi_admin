const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuario = require('../models/Usuario');

passport.use(new LocalStrategy({
    usernameField: 'username'
}, async (username, password, done) => {
    const usuario = await Usuario.findOne({username: username});
    if(!usuario) {
        return done(null, false, {message: 'Usuario incorrecto'});
    }
    else{
        const match = await usuario.matchPassword(password);
        if(match) {
            return done(null, usuario);
        }
        else {
            return done(null, false, {message: 'Contraseña incorrecta'});
        }
    }
}));

passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});

passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, usuario) => {
        done(err, usuario);
    });
});