const mongoose = require('mongoose');
const validator= require('validator');
const bcrypt=require('bcryptjs');

const userSchema= new mongoose.Schema({

  name:{
    type:String,
    required:[true,"Please enter your name"],
    maxLength:[30,"Name can not exceed 30 characters"],
    minLength:[4,"Name should have more than 4 characters"],

  },

  email:{
  type:String,
  required:[true,"Please enter your email"],
  unique:true,
  validate:[validator.isEmail,"Pease enter a valid email"],
  },

  password:{
   type:String,
   required:[true,"Please enter your password"],
   minLength:[8,"Password should be greater than 8 characters"],
   select:false,//password field nhi milega in query
  },
  avatar:{
    public_id:{
      type:String,
      required:true
    },
    url:{
      type:String,
      required:true
    }
  },
  // admin h ya user h
  role:{
   type:String,
   default:"user",

  },
  resetPasswordToken:String,
  resetPasswordExpire:Date,
});

//encrypting password before saving info in the DB
//this event will fire before the info is saved in db
userSchema.pre("save",async function(next){

  //if pswrd not modified, don't hash ,call next()
  if(!this.isModified("password")){
    next();
  }
 //if pswrd is modified hash it
  this.password= await bcrypt.hash(this.password,10);
});

module.exports=mongoose.model('User',userSchema);