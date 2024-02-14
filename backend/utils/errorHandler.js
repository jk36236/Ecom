//error- default class in nodejs
//inherting errorhandler class from error
class ErrorHandler extends Error{
 
  constructor(message,statusCode){
    //super-constructor of parent class(error)
    super(message);
    this.statusCode=statusCode;
//1st argument-object->errorhandler->this
//2nd-constructor, 
    Error.captureStackTrace(this,this.constructor);
  }
}

module.exports=ErrorHandler

//to use this create a middleware