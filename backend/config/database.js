const mongoose=require('mongoose');


const connectDatabase=()=>{

  mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}).then((data)=>{
    console.log(`Mongodb connected with server ${data.connection.host}`);
    });
//havn't used catch because that error in handled in server.js in unhandled promise rejection
}

module.exports=connectDatabase;
