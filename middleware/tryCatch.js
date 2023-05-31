const ErrorHandler = require("../utils/Errorhandler")

const trycatch=(controller)=>async(req,res,next)=>{
    try{
        await controller(req,res,next)
    }
    catch(error){
        return next(new ErrorHandler(error.message))
    }
}

module.exports=trycatch