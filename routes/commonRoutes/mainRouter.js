const express = require('express')
const router = express.Router()
const user_routes  = require('../userRoutes/user_router')


router.use('/user', user_routes) 

module.exports = router