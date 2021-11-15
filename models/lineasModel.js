const {Schema, model} = require('mongoose');
const lineaSchema = new Schema({
    Nombre:String,
    Categoria: String,
    Telefonos:Array,
    Pasajes:Array,
    Horarios:Array,
    Calles:Array,
    Imagen:String,
    ZonasBusqueda:Array,
    ZonasCBBA:Array,
    Rutas:Object
},{ versionKey: false });

module.exports = model('lineas', lineaSchema);