const mongoose = require('mongoose')


const profilePic = new mongoose.Schema({
    profile_pic : {
        type : String,
        require : true
    },
    userId : {
       type : mongoose.Schema.Types.ObjectId,
       ref : 'user',
       require : true
    }
})
profilePic.set('timestamps',true)

module.exports = mongoose.model('profile_pic', profilePic)
