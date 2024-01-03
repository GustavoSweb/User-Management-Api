const express = require('express')
const Router = express.Router()
const User = require('../controllers/UserController')

Router.get('/user', User.GetUsers)
Router.post('/user', User.CreateUser)
Router.get('/user/:id', User.FindUser)
Router.put('/user/:id', User.UpdateUser)
Router.delete('/user/:id', User.DeleteUser)
module.exports = Router