const puntosEstrategicosService = require('../services/puntosEstrategicosService');

const consultaPuntosEstrategicos = async (req, res) => {
    res.json({
        puntosEstrategicos: await puntosEstrategicosService.getPuntosEstrategicos()
    });
}

module.exports = { consultaPuntosEstrategicos };