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

//mongoose duplicate key error when same usr tries to register again]
if(err.code === 11000){
  const message = `Duplicate Key Error.User already exists`;
  // console.log(message);
  err= new ErrorHandler(message,400);
}

//Wrong JWT error
if(err.name === "JsonWebTokenError"){
  const message = `Json web Token is invalid,Try again`;
  // console.log(message);
  err= new ErrorHandler(message,400);
} 

//JWT Expire error
if(err.name === "TokenExpiredError"){
  const message = `Json web Token is expired,Try again`;
  // console.log(message);
  err= new ErrorHandler(message,400);
} 

res.status(err.statusCode).json({
  success:false,
  message:err.message
});
}