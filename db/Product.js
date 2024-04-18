const mongoose= require("mongoose");
const productSchema = new mongoose.Schema({
name:String,
category:String,
company:String,
price:Number,
userId:String

});

module.exports =mongoose.model("products",productSchema)
