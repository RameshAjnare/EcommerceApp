require('dotenv').config()
const express = require('express')
require('./model/config')
const router = require('./routes/commonRoutes/mainRouter')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 8000


app.use(bodyParser.json())
app.use('/',router)
const server = app.listen(port, ()=>{
    console.log(`server has been connected on PORT=${port}`);
})

module.exports = server 