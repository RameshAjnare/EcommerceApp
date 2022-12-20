const express = require('express')
const router = express.Router()
const userController = require('../../controller/userController/userController')
const userValidation = require('../../validation/user_validation/user_validation')


router.post('/signup', userValidation.userRegisterValidation, userController.signup)

module.exports = router