const lineasService = require('../services/lineasService');

const consultLineas = async (req, res) => {
    res.json({
        response: "success",
        data: await lineasService.getLineas()
    });
}

module.exports = {consultLineas};