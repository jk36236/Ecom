const ErrorHandler= require('../utils/errorHandler');

//500-internal server error
module.exports=(err,req,res,next)=>{
err.statusCode= err.statusCode ||  500;

err.message= err.message || "Internal Server Error";

//Wrong Mongodb id error
if(err.name === "CastError"){
  const message=  `Resource not found. Invalid ${err.path}`;
  err=new ErrorHandler(message,400);//400-bad request
}

res.status(err.statusCode).json({
  success:false,
  message:err.message
});
}