const userService = require('../services/usuarioService');

const consultUsers = async (req, res) => {
    res.json({
        usuario: await userService.getUsers()
    });
}

module.exports = {consultUsers};