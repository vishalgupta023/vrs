function generateOtp() {
       const otp = Math.floor(1000 + Math.random() * 8999);
       return otp
    }

module.exports=generateOtp;    