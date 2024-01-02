const express = require('express')
const Router = express.Router()
const User = require('../controllers/UserController')
Router.get('/users', User.GetUsers)
Router.post('/user', User.CreateUser)

module.exports = Router