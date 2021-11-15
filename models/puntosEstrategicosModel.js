const {Schema, model} = require('mongoose');
const puntoSchema = new Schema({
    Nombre:String,
    Categoria: String,
    Calles:Array,
    Imagen:String,
    ZonasCBBA:String,
    Lineas:Array,
    Descripcion:String,
    Punto:Object,
    Marcador:String
},{ versionKey: false });

module.exports = model('punto', puntoSchema);