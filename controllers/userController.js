const trycatch = require("../middleware/tryCatch");
const User=require("../models/userModel");
const ErrorHandler=require("../utils/Errorhandler");


exports.createUser=trycatch(async(req,res,next)=>{
    const user =await User.create(req.body);
   const token= user.jswToken();
    res.status(201).json({
        sucess:true,
        user,
        token
    })  

})