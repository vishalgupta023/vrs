const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    mobile:String
})

const userModel=mongoose.model("users",userSchema);
module.exports=userModel;
