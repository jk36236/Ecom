const ErrorHandler= require('../utils/errorHandler');
const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const User= require('../models/userModel');
const sendToken=require('../utils/jwtToken');
const sendEmail=require('../utils/sendEmail');
const crypto=require("crypto");


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


//---------------------FORGOT PASSWORD----------------
exports.forgotPassword=catchAsyncErrors(
  async(req,res,next)=>{

    //get the user
    const user=await User.findOne({emal:req.body.email});

    if(!user){
      return next(new ErrorHandler("User not found",404));
    }
    //if user is found,get Resetpassword token
    const resetToken=user.getResetPasswordToken();
//saving the user
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;


    const message=`Your password reset Token is: \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`;

    //send message
    try {
      await sendEmail({
        email:user.email,
        subject:`Ecommerce Password Recovery`,
        message,
      });

      res.status(200).json({
        success:true,
        message:`Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      //if we get error,1st make values undefined which u saved in db ,and again save them
      user.resetPasswordToken=undefined;
      user.resetPasswordExpire=undefined;

      await user.save({validateBeforeSave:false});

      return next(new ErrorHandler(error.message,500));
    }
  }
);


// -------------------RESET PASSWORD------------
exports.resetPassword=catchAsyncErrors(
  async(req,res,next)=>{
    //creating token hash
    const resetPasswordToken= crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    //finding user in db with the hashed token
    const user=await User.findOne({
      resetPasswordToken,
      resetPasswordExpire:{$gt:Date.now()},//token expire time should be > current time for reset pswd
    });


    if(!user){
      return next(
        new ErrorHandler("Reset Token is invalid or has been expired",400)
      );
    }

//if passwords does not match
    if(req.body.password !==req.body.confirmPassword){
      return next(
       new ErrorHandler("Password does not match confirm Password",400)
      );
    }

    //if usr is found and pswd and cpswd matches,then save new pswd of user

    user.password=req.body.password;
    //make these undefined and save 
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();
    //for logging in user
    sendToken(user,200,res);


  }
);