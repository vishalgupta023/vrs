const express=require("express");
const { sendOtp } = require("../controllers/otpController");
const router=express.Router();

router.route("/send-otp").post(sendOtp);

module.exports=router