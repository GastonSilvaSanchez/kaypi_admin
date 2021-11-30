const {Schema, model} = require('mongoose');
const bcrypts = require('bcryptjs');

const usuarioSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
},{
    versionKey: false
});

usuarioSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypts.genSalt(10);
    const hash = bcrypts.hash(password, salt);
    return hash;
};

usuarioSchema.methods.matchPassword = async function (password) {
    return await bcrypts.compare(password, this.password);
}

module.exports = model('usuarios', usuarioSchema);