const user = require('./user_schema')


module.exports = {

    userRegisterValidation : async (req,res,next) =>{
        const value = await user.userSignup.validate (req.body, {abortEarly : false})
        if(value.error){
            res.status(202).json({
                success : "Failed",
                message : value.error.details[0].message
            })
        }else{
            next()
        }
    },

    userLoginValidation : async (req,res,next) =>{
        const value = await user.userLogin.validate (req.body, {abortEarly : false})
        if(value.error){
            res.status(202).json({
                success : "Failed",
                message : value.error.details[0].message
            })
        }else{
            next()
        }
    }
}
