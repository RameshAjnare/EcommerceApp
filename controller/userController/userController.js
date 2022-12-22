const UserSchema = require('../../model/user_schema')
const ProfilePic = require('../../model/profile_schema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {transporter} = require('../../service/sendEmail')


const signup = async (req, res) =>{
    try{
        const { password ,confirm } = req.body
        const userData = new UserSchema(req.body)
        const checkUser = await UserSchema.findOne({email : userData.email})
        if(checkUser != null) {
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
          if(userData.gender === "male"){
                userData.profile_pic = '/uploads/img_avatar(male).png'
          }else if(userData.gender === "female"){
            userData.profile_pic = '/uploads/img_avatar(female).png'
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

const userDataUpdate = async (req, res) => {
    try {
            const filePath =`/uploads/${req.file.filename}`;
            const data = {
              name : req.body.name,
              profile_pic : filePath
            }
            await UserSchema.findByIdAndUpdate(req.params.id, data, {new : true})
            return res.status(200).json({
             status : "Success",
             message : "Upadate User Data.."
          })
    } catch (error) {
      return res.status(500).json({
        status : "Failed",
        message : error.message
      })
    }
}

const userLogin = async(req,res) => {
   try{
         const {email,password} = req.body
           const checkUser = await UserSchema.findOne({email : email})
            if(checkUser != null){
               const isActive = await bcrypt.compare(password, checkUser.password)  
                if(isActive){
                  const token = await jwt.sign({userId : checkUser._id},process.env.SECRECT_KEY, {expiresIn  : '4d'})
                  const userData = await UserSchema.findById(checkUser._id).select('-password')
                  return res.status(200).json({
                    status : "Success",
                    userData : userData,
                    token : token
                  })  
                }else{
                  return res.status(401).json({
                    status : "Failed",
                    message : "Password is not match"
                  }) 
                }
            }else{
              return res.status(404).json({
                status : "Failed",
                message : "User not found.."
              })
            }
      }catch(error){
        return res.status(500).json({
          status : "Failed",
          message : error.message
        })
   }
}

const mailSendForResetPass = async (req, res) => {
   const {email} = req.body
   console.log(req.user);
   try{
          const userExits = await UserSchema.findOne({email : email})
          if(userExits != null){
              const SECRECT_KEY = userExits._id + process.env.SECRECT_KEY   
              const token = await jwt.sign({userId : userExits._id},SECRECT_KEY, {expiresIn : '5m'})
              const link = `http://127.0.0.1:3000/api/user/reset/${userExits._id}/${token}`
              const info = transporter.sendMail({
                from : "rajnare90@gmail.com",
                to : "rajnare90@gmail.com",
                subject : "Link send for password reset",
                text : `<a href=${link}>Click on this for reset password</a>`
              })
              return res.status(200).json({
                status : "Success",
                message : "Email send to user successfully",
                token : token,
                userID : userExits._id
              })

          }else{
            return res.status(550).json({
              status : "Failed",
              message : "User is not found"
            })
          }
   }catch(err){
     return res.status(500).json({
       status : "Failed",
       message : err.message
     })
   }
}

const forgetPassword = async (req, res)=>{
      try{
          const {new_password , confirm_pass, old_password } = req.body
          const {id, token} = req.params
          if(id != undefined){
            const userData = await UserSchema.findById(id)
            const isPassword = await bcrypt.compare(old_password, userData.password)
            if(new_password === confirm_pass && userData != null && isPassword){
                const {userId} = await jwt.verify(token,userData._id+process.env.SECRECT_KEY)
                const salt = await bcrypt.genSalt(10)
                password = await bcrypt.hash(new_password, salt)  
                await UserSchema.findByIdAndUpdate(userId, 
                  {$set : {password : password}})
                return res.status(200).json({
                  status : "Success",
                  message : "Password reset successfully...",
                })
            }else{
              return res.status(401).json({
                status : "Failed",
                message : "Password is match OR userData is null ",
              })
            }
          }else{
            return res.status(204).json({
              status : "Failed",
              message : "User Id is not found",
            })
          }
      }catch(err){
        return res.status(500).json({
          status : "Failed",
          message : err.message,
        })
      }
}

module.exports = {signup, userDataUpdate, userLogin, mailSendForResetPass, forgetPassword }
