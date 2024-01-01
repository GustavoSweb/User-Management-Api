const UserModels = require('../models/User')
class User{
    constructor(){
        this.UserModels = new UserModels()
    }
    async GetUsers(req, res){
        res.json(this.UserModels.findAll())
    }
}

module.exports = User