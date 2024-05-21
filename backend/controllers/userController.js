const ErrorHandler= require('../utils/errorHandler');
const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const User= require('../models/userModel');
const sendToken=require('../utils/jwtToken');
const sendEmail=require('../utils/sendEmail');
const crypto=require("crypto");
const cloudinary=require("cloudinary");


//--------- REGISTERING a user---------
exports.registerUser=catchAsyncErrors(
  async(req,res,next)=>{
    //uploading user avatar on cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      //options
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

 const{name,email,password}= req.body;
 //create user
 const user= await User.create({
  name,email,password,
  //cloudinary
  avatar:{
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
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
    const user=await User.findOne({email:req.body.email});

    if(!user){
      return next(new ErrorHandler("User not found",404));
    }
    //if user is found,get Resetpassword token
    const resetToken=user.getResetPasswordToken();
//saving the user
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`;


    const message=`Your password reset Token is : \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`;

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


//-----------------Get User Profile Details(logged in usr profile)-----------------

exports.getUserDetails=catchAsyncErrors(
  async(req,res,next)=>{
   
    const user=await User.findById(req.user.id);//will always get user,because only loggedin  
                                                //user can acces this route

    res.status(200).json({
      success:true,
      user,
    });
  }
);


// ----------------- Update user password----------------------
exports.updatePassword=catchAsyncErrors(
  async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");

    //match the passwords(old pswd entered and pswd in db)
    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);


    if(!isPasswordMatched){
      return next(
        new ErrorHandler('Old Password is incorrect',400)
      );
    }

    //compare newpswd and confirmpaswd
    if(req.body.newPassword !== req.body.confirmPassword){
      return next(
        new ErrorHandler('Password does not match',400)
      );
    }

    //if old paswd matches with paswd in db and newpswd and confirmpswd also matches,now update pswd,save user and generate new token and  save in cookie (i.e. logg in the user)
    user.password=req.body.newPassword;
    await user.save();
    sendToken(user,200,res);//for logging in user
  }
);


// ----------------- Update user profile----------------------
exports.updateProfile=catchAsyncErrors(
  async(req,res,next)=>{
    
    const newUserData={
      name:req.body.name,
      email:req.body.email,
    }
    //pswrd update ke liye alag route h
    // -------------cloudnary ----------
    if(req.body.avatar !== ""){
      const user=await User.findById(req.user.id);
      const imageId=user.avatar.public_id;
      //destroy old image
      await cloudinary.v2.uploader.destroy(imageId);
      const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",
      });

      //adding avatar details in newUserData
      newUserData.avatar={
        public_id:myCloud.public_id,
        url:myCloud.secure_url,
      }

    }
    // ----------------------------------------

    //find user by id and update
    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
      new:true,
      runValidators:true,
      useFindAndModify:false,
    });
    
    res.status(200).json({
      success:true,
    });
  }
);


// -----------------GET ALL USERS(admin)-------------
exports.getAllUsers=catchAsyncErrors(
  async(req,res,next)=>{
    const users=await User.find();//ye sare users lakar dega

    res.status(200).json({
      success:true,
      users,
    });
  }
);

//-----------GET SINGLE USER DETAILS(admin)-----------------
exports.getSingleUser=catchAsyncErrors(
  async(req,res,next)=>{
    const user=await User.findById(req.params.id);

    if(!user){
      return next(
        new ErrorHandler(`User does not exists with Id: ${req.params.id}`,400)
      );
    }

    res.status(200).json({
      success:true,
      user,
    });
  }
);

//-------------------UPDATE USER ROLE(ADMIN)--------------
exports.updateUserRole=catchAsyncErrors(
  async(req,res,next)=>{
    const newUserData={
      name:req.body.name,
      email:req.body.email,
      role:req.body.role,
    }

    //find user by id and update
    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
      new:true,
      runValidators:true,
      useFindAndModify:false,
    });
    
    res.status(200).json({
      success:true,
    });
  }
);


//------------------- DELETE USER(ADMIN)--------------
exports.deleteUser=catchAsyncErrors(
  async(req,res,next)=>{
    //find user by id 
    const user=await User.findById(req.params.id);   
    if(!user){
      return next(
        new ErrorHandler(`User does not exists with Id: ${req.params.id}`,400)
      );
    }
    const imageId=user.avatar.public_id;
    //destroy old image
    await cloudinary.v2.uploader.destroy(imageId);


    //if got the user, simply remove it
    await user.remove();
    
    res.status(200).json({
      success:true,
      message:"User Deleted Successfully",
    });
  }
);

