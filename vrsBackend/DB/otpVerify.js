const mongoose=require("mongoose");
const otpSchema=new mongoose.Schema({
    email:String,
    otp:Number
})

const otpModel=mongoose.model("otps",otpSchema);
module.exports=otpModel;
