const express = require('express')
const Router = express.Router()
const User = require('../controllers/User')


Router.get('/user', User.GetUsers)

module.exports = Router