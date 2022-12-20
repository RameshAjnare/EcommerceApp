const UserSchema = require('../../model/user_schema')
const bcrypt = require('bcrypt')


const signup = async (req, res) =>{
    try{
        const { password ,confirm } = req.body
        const userData = new UserSchema(req.body)
        const email = await UserSchema.findOne({email : userData.email})
        if(email != null) {
           return res.status(403).json({
                status : "Failed",
                message : "Email Ready Exist...."
             })   
        }
      if(password === confirm && userData != null) {
          if(userData.role === "user"){
            userData.isActive = true 
           }else{
            userData.isActive = false
          }
        const salt = await bcrypt.genSalt(10)
        userData.password = await bcrypt.hash(password, salt)   
        await userData.save()
       return res.status(201).json({
            status : "Success",
            message : "Register Succsessfully...."
         })
      } else{
        return res.status(401).json({
            status : "Failed",
            message : "Password is not match..."
         })
      } 
    }catch(err){
        return res.status(500).json({
            status : "Error",
            message : err.message
         })
    }
}

module.exports = {signup}
