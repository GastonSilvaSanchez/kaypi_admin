const userModel = require('../models/userModel');

class UserService {

    UserService(){}

    async getUsers() {
        try {
            return await userModel.find();
        }
        catch(error){
            throw new Error(error);
        }
    }
}

module.exports = new UserService();