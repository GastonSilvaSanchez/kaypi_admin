const Linea = require('../models/Linea');

class LineasService {

    LineasService(){}

    async getLineas() {
        try {
            return await Linea.find();
        }
        catch(error){
            throw new Error(error);
        } 
    }
}

module.exports = new LineasService();