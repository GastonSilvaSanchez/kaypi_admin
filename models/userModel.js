const {Schema, model} = require('mongoose');
const userSchema = new Schema({
    nombreUsuario:String,
    contraseña: String
});

module.exports = model('Usuario', userSchema);