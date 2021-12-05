const lineasService = require('../services/lineasService');

const consultaLineas = async (req, res) => {
    res.json({
        lineas: await lineasService.getLineas()
    });
}

module.exports = { consultaLineas };