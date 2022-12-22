const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    contact : {
        type : Number,
        require : true
    },
    password : {
        type : String,
        require : true
    },
     isActive: {
        type : Boolean,
        require : true
    },
    role : {
        type : String,
        require : true
    },
    profile_pic : {
        type : String,
        require : true
    },
    gender : {
        type : String,
        require : true
    },
})
userSchema.set('timestramp', true)

module.exports = mongoose.model('user', userSchema)