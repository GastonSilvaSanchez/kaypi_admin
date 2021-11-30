const PuntoEstrategico = require('../models/PuntoEstrategico');

class PuntosEstrategicosService {

    PuntosEstrategicosService(){}

    async getPuntosEstrategicos() {
        try {
            return await PuntoEstrategico.find();
        }
        catch(error){
            throw new Error(error);
        }
    }
}

module.exports = new PuntosEstrategicosService();