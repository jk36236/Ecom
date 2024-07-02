const app=require('./app');

const connectDatabase=require('./config/database');
const cloudinary=require("cloudinary");

//Handling uncaught exception
process.on("uncaughtException",(err)=>{
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to uncaught Exception');
  process.exit(1);
})

// config - path of dotenv file
if(process.env.NODE_ENV !== "PRODUCTION"){
require('dotenv').config({path:"backend/config/config.env"});
}


//connecting to database
connectDatabase();

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server=app.listen(process.env.PORT,()=>{
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

//unhandled promise rejections
process.on("unhandledRejection",(err)=>{
console.log(`Error: ${err.message}`);
console.log(`Shutting down the server due to Unhandled Promise Rejection`);

//server ko close karenge aur 1 callback function denge ki jaise he server close ho is process se exit ho jaye
server.close(()=>{
  process.exit(1);
})
});