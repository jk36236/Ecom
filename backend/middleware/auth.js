const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt=require('jsonwebtoken');
const User=require('../models/userModel');


// authenticating user(to check whether user is logged in nor not)
exports.isAuthenticatedUser=catchAsyncErrors(
  async(req,res,next)=>{
    const {token}=req.cookies;
    

    //if token not found
    if(!token){
      return next(new ErrorHandler("Please login to access this resource",401));
    }

    const decodedData=jwt.verify(token,process.env.JWT_SECRET);

    //saving user id in req.user
    req.user=await User.findById(decodedData.id);
    next();
  }
);

//admin authorization
exports.authorizeRoles=(...roles)=>{
return (req,res,next)=>{
  //if not admin
if(!roles.includes(req.user.role)){
  return next(
  new ErrorHandler(`Role: ${req.user.role} is not alowed to access this resource`,403)
  );
}
//if admin
next();
};
};