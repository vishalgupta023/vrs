const express = require("express")
require("./DB/config")
const User = require("./DB/user");
const cors = require("cors")
const app = express();
const verifyOtp = require("./DB/otpVerify");
const otpModel = require("./DB/otpVerify");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const BASE_URL=process.env.BASE_URL;
const CLIENT_ID = "768700542475-j8hqk0ltudtiv7802ls4sa7v0ek0v5ve.apps.googleusercontent.com";
const CLIENT_SECRET = "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"
const REFRESH_TOKEN = "1//04G3q7i76sc2KCgYIARAAGAQSNwF-L9IrKsE2d85qdpMvP-hiahG5wMFVKDXQw8BIOCwknNiH2En_8Au6AxuuqYKiCpQtfJ6QYxw"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"

app.use(express.json())
app.use(cors())

app.post("/register", async (req, resp) => {
   const result = new User(req.body);
   let data = await result.save();
   data = data.toObject()
   delete data.password;
   resp.send(data);
})

// Login Api
app.post("/login", async (req, resp) => {
   const result = await User.findOne(req.body).select("-password");
   if (result) {
      resp.send(result)
   } else {
      resp.send({ mark: "No user found please login" })
   }
})
// Account verify
app.post("/acc-verify", async (req, resp) => {
   const result = await User.findOne(req.body).select("-password");
   if (result) {
      resp.send(true);
   } else {
      resp.send(false)
   }
})
// otp verification

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(gmail,otp) {

   try {
      const accesToken = await oAuth2Client.getAccessToken();
      const transport = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            type: 'oauth2',
            user: 'vrsit001@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accesToken
         }
      })
      const mailOptions = {
         from: "VRSamadhan <vrsit001@gmail.com>",
         to:`${gmail}`,
         subject: "OTP verification",
         text: `${otp}`,
         html: `<h4 style='color:green' >Your one time password for VRsamadhan Job protal is <span style='color:blue'> ${otp}</span> dont share it with anyone </h4>`
      }
      const result = await transport.sendMail(mailOptions);
      return result
   }
   catch (error) {
      return error
   }

}
// sendMail().then(res=>console.log("email sent",res)).catch(err=>console.log(err))

app.post("/otp-sent", async (req, resp) => {
   // otp verification code
   let crntOtp = generateOtp();
   let value = new verifyOtp({ email: req.body.email, otp: crntOtp });
   value = await value.save();
   
  const data=await sendMail(req.body.email,crntOtp);
   if(data){
      resp.send(true)
   }else{
      resp.send(false)
   }
})
// otp-verification API
app.post("/otp-verify", async (req, resp) => {
   let value = await verifyOtp.findOne(req.body);
   console.log(req.body)
   if(value){
      resp.send(true)
   }else{
      resp.send(false)
   }
})

function generateOtp() {
   const otp = Math.floor(1000 + Math.random() * 8999);
   return otp
}



























app.listen(4000, console.log("serever is running on port", 4000));

