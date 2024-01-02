const express = require('express')
const Router = express.Router()
const User = require('../controllers/UserController')

Router.get('/user', User.GetUsers)
Router.post('/user', User.CreateUser)
Router.get('/user/:id', User.FindUser)

module.exports = Router