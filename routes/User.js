const express = require('express')
const Router = express.Router()
const User = require('../controllers/UserController')
const AuthAdmin = require('../middlewares/AuthAdmin')

Router.get('/user',AuthAdmin, User.GetUsers)
Router.post('/user', User.CreateUser)
Router.get('/user/:id', User.FindUser)
Router.put('/user/:id', User.UpdateUser)
Router.delete('/user/:id', User.DeleteUser)
Router.put('/changepassword', User.ChangePassword)
Router.post('/login', User.Login)

module.exports = Router