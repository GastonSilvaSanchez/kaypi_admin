const puntosEstrategicosService = require('../services/puntosEstrategicosService');

const consultaPuntosEstrategicos = async (req, res) => {
    res.json({
        response: "success",
        data: await puntosEstrategicosService.getPuntosEstrategicos()
    });
}

module.exports = { consultaPuntosEstrategicos };