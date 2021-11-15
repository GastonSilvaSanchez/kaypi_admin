const puntosEstrategicosService = require('../services/puntosEstrategicosService');

const consultPuntosEstrategicos = async (req, res) => {
    res.json({
        response: "success",
        data: await puntosEstrategicosService.getPuntosEstrategicos()
    });
}

module.exports = {consultPuntosEstrategicos};