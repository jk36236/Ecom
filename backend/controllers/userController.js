const ErrorHandler= require('../utils/errorHandler');
const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const User= require('../models/userModel');
const sendToken=require('../utils/jwtToken');



//--------- REGISTERING a user---------
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

 //calling method for generating token and storing in cookie
 sendToken(user,201,res);

});




//-----LOGIN User-----
exports.loginUser=catchAsyncErrors(
  async(req,res,next)=>{

    const{email,password}=req.body;

    //checking if usr has given pswd and email both
    if(!email || !password){
      return next(new ErrorHandler("Please enter email and password",400));
    }
    //find user
    const user=await User.findOne({email}).select("+password");
    //if not found
    if(!user){
      return next(new ErrorHandler("Invalid email or password",401));
    }
    //if found,then match passwords
    const isPasswordMatched=user.comparePassword(password);

    //if pswd not matched
    if(!isPasswordMatched){
      return next(new ErrorHandler("Invalid email or Password",401));//401-unauthorized
    }


  //  if matches
  //call method for generating token and storing in cookie
sendToken(user, 200, res);

});


// --------LOGOUT user-----------
exports.logout=catchAsyncErrors(
  async(req,res,next)=>{

    //setting token as null
    res.cookie("token",null,{
      expires:new Date(Date.now()),
      httpOnly:true,
    })

    res.status(200).json({
      success:true,
      message:"Logged Out",
    })
  }
);