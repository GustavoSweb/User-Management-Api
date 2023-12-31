const express = require('express')
const app = express()
const UserRouter = require('./routes/User')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', UserRouter)


const PORT = process.env.PORT || 8081
app.listen(PORT,()=> console.log('Servidor Rodando....'))