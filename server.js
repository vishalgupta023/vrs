const app=require("./app");
const connectdb=require("./config/connectDB");
const dotenv=require("dotenv");
const sendMail=require("./utils/OtpMailSend")


// dot env path added
dotenv.config({path:"config/config.env"})
connectdb();




const Server= app.listen(process.env.PORT,()=>{
    console.log(`Server i running on https://localhost:${process.env.PORT} `)
})

