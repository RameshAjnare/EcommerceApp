const mongoose = require('mongoose')

mongoose.set("strictQuery", false);
mongoose.connect(process.env.URL, {useNewUrlParser:true})
const con = mongoose.connection
con.once('open', ()=>{
    console.log('mongoDB is connect successfully');
})