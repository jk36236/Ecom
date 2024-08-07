const express= require('express');
const app= express();
const cookieParser=require('cookie-parser');
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");
const path= require('path');

const errorMiddleware=require('./middleware/error');

// config - path of dotenv file
if(process.env.NODE_ENV !== "PRODUCTION"){
  require('dotenv').config({path:"backend/config/config.env"});
  }
  

app.use(cookieParser());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({extended:true, limit: '100mb'}));
app.use(express.json());
app.use(fileUpload());

//Route imports
const product=require('./routes/productRoute');
const user =require('./routes/userRoute');
const order=require('./routes/orderRoute');
const payment=require('./routes/paymentRoute');



app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);

// ------deployment-------------
const __dirname1 = __dirname;
if(process.env.NODE_ENV === "PRODUCTION"){
app.use(express.static(path.join(__dirname1, "../frontend/build")));

app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname1, "../frontend/build/index.html"));
});
}else{
  app.get("/",(req,res)=>{
    res.send("Hey!,API is running..");
    })
}

//middleware for errors
app.use(errorMiddleware);

module.exports=app;