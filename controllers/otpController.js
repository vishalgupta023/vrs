const { response } = require("../app");
const tryCatch = require("../middleware/tryCatch");
const Otp=require("../models/otpModel")
const ErrorHandler=require("../utils/Errorhandler");
const generateOtp=require("../utils/GenrateOtp");
const sendMail=require("../utils/OtpMailSend")

exports.sendOtp=tryCatch(async(req,res,next)=>{
    let crntOtp = generateOtp();
    console.log(crntOtp)
      const otp=await Otp.create({email:req.body.email,otp:crntOtp})
       
      const data=await sendMail(req.body.email,crntOtp);
    if(!data.accepted){
        next(new ErrorHandler("Error in sending otp",500))
    }
    res.status(200).json({
        sucess:true,
        message:"otp sent sucessfull!"
    })
})