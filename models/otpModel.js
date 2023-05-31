const mongoose=require("mongoose");
const otpSchema=new mongoose.Schema({
    email:String,
    otp:Number
})

const Otp=mongoose.model("otps",otpSchema);
module.exports=Otp;