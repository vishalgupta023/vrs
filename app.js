const express=require("express");
const cors = require("cors");
const userRoute=require("./routes/userRoutes");
const otpRoute=require("./routes/otpRoutes");
const customError = require("./middleware/errror");

const app=express();

// system middleware
app.use(express.json())
app.use(cors())

// router middleware
app.use("/api/v1",userRoute);
app.use("/api/v1",otpRoute);


// Error middlewares
app.use(customError);


module.exports=app;