const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "user",
  },
  productName: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  productPics: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  offerPrice: {
    type: Number,
    default: 0,
  },
   features: {
    type: String,
    require: true,
  },
  specs: {
    type: String,
    require: true,
  },
  isActive :{
    type : Boolean,
    require : true
  }
});
productSchema.set("timestamps",true)

module.exports = mongoose.model("product",productSchema)
