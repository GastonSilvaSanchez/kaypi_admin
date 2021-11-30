const lineasService = require('../services/lineasService');

const consultaLineas = async (req, res) => {
    res.json({
        response: "success",
        data: await lineasService.getLineas()
    });
}

module.exports = { consultaLineas };