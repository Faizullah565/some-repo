let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
   name:String,
   city:String,
   password:String,
   type:String,
   file:String
});

module.exports = mongoose.model("user", userSchema)

