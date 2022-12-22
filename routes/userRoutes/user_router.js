const express = require('express')
const router = express.Router()
const upload = require('../../middleware/profileStorage')
const userController = require('../../controller/userController/userController')
const userValidation = require('../../validation/user_validation/user_validation')
const {checkUserAuth} = require('../../middleware/verifyAuthorize')


router.post('/signup', userValidation.userRegisterValidation, userController.signup)
router.post('/login', userValidation.userLoginValidation, userController.userLogin)
router.post('/email_rest_pass', checkUserAuth, userController.mailSendForResetPass)
router.patch('/rest_password/:id/:token', userController.forgetPassword)
router.patch('/user_update/:id',upload.single('profile_pic'), userController.userDataUpdate)

module.exports = router 