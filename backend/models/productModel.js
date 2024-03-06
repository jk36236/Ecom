const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  name:{
    type:String,
    required:[true,"Please enter product name"],//if no name is given then 2nd value will be shown
    trim:true
  },
  description:{
    type:String,
    required:[true,"Please enter product description"]
  },
  price:{
    type:Number,
    required:[true,"Please enter product price"],
    maxlength:[8,'Price can not exceed 8 characters']
  },
  ratings:{
    type:Number,
    default:0,//if no rating is there

  },
  images:[
     {
      public_id:{
        type:String,
        required:true
       },
       url:{
        type:String,
        required:true
       }
     }
    ],
  category:{
    type:String,
    required:[true,"Please enter product category"],
  },
  stock:{
    type:Number,
    required:[true,"Please enter product stock"],
    maxlenght:[4,"Stock can not exceed 4 characters"],
    default:1
  },
  numOfReviews:{
    type:Number,
    default:0
  },
  reviews:[
    // kisne diya uska naam and kya rating di and comment
    {
      name:{
        type:String,
        required:true
      },
      rating:{
        type:Number,
        required:true
      },
      comment:{
        type:String,
        required:true
      }
    }
  ],
//to know which user(admin) created the product,we'll store usrid of him
  user:{
   type:mongoose.Schema.ObjectId,
   ref:"User",
   required:true,
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
})

module.exports= mongoose.model("Product",productSchema);