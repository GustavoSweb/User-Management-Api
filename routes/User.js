const express = require('express')
const Router = express.Router()
const User = require('../controllers/User')
const UserRouters = new User()

Router.get('/users', UserRouters.GetUsers)

module.exports = Router