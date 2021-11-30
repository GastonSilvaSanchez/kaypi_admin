const {Schema, model} = require('mongoose');

const lineaTransporteSchema = new Schema({
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

module.exports = model('lineas', lineaTransporteSchema);