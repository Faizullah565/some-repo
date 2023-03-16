let mongoose = require('mongoose');

let adsSchema = mongoose.Schema({
   title:String,
   price:Number,
   adPicture:String
});

module.exports = mongoose.model("Ads", adsSchema)

