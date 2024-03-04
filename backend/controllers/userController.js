const ErrorHandler= require('../utils/errorHandler');
const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const User= require('../models/userModel');



//function for registering a user
exports.registerUser=catchAsyncErrors(
  async(req,res,next)=>{

 const{name,email,password}= req.body;
 //create user
 const user= await User.create({
  name,email,password,
  //temporary(will use cloudnary for avatar)
  avatar:{
    public_id:"this is sample id",
    url:"profilePicUrl"
  }
 });

 res.status(200).json({
   success:true,
   user,
});

}
);