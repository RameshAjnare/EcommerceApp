const jwt = require('jsonwebtoken')
const UserSchema = require('../model/user_schema')


const checkUserAuth = async (req, res, next) => {
const { authorization } = req.headers;
let token;
if(authorization && authorization.startsWith("Bearer")) {
    try{
        token = authorization.split(" ")[1];
        const {userId} = jwt.verify(token, process.env.SECRECT_KEY);
        req.user = await UserSchema.findById(userId).select('-password')
         next()
        }catch(err){
            res.status(401).json({
                status : "Failed",
                message : err.message
            })
        }
    }
    if(!token){
        res.status(401).json({
            status :"unauthorize",
            message:"unauthorize no token..."
        })
    }

}

module.exports = {checkUserAuth}