const customError=async (err,req,res,next)=>{
    err.SatusCode=err.SatusCode||500;
    err.message=err.message||"Internal Server Error";
    res.status(err.statusCode).json({
        sucess:false,
        Error:err.message
    })
}

module.exports=customError;