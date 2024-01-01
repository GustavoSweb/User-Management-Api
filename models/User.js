const database = require('../database/index')

class User{
     async  findAll(){
        return await database.select(['id', 'name', 'email', 'role']).table('users')
    }
     async create({name, email, password}){
        return await database.insert({id, name, email, password}).into('users')
    }
}
module.exports = User