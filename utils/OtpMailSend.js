const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const CLIENT_ID="290506805923-pa44in5ps18a27htuhmp2a07r6nc9bdg.apps.googleusercontent.com"
const CLIENT_SECRET="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"
const REDIRECT_URI="https://developers.google.com/oauthplayground"
const REFRESH_TOKEN="1//04NfMq6QVxIgJCgYIARAAGAQSNwF-L9IrR-BwF_7klRf9dU8g906ytyVhXvjcVUiJbTUZ1uPJ2WjCf3zIC4GCKFJvtgDxMcCxaUU"


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token:REFRESH_TOKEN });


async function sendMail(gmail,otp) {

   try {
      const accesToken = await oAuth2Client.getAccessToken();
      const transport = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            type: 'oauth2',
            user: 'vrsit001@gmail.com',
            clientId: CLIENT_ID,
            clientSecret:  CLIENT_SECRET,
            refreshToken:REFRESH_TOKEN,
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

// sendMail("vishalgupta91998@gmail.com",12425).then((data)=>{
//     console.log(data)}).catch((err)=>{
//         console.log(err)
//     })
module.exports=sendMail;
