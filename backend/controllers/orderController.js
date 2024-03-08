const Order=require('../models/orderModel');
const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const Product= require('../models/productModel');


//---------- creating a new order----------
exports.newOrder=catchAsyncErrors(
  async(req,res,next)=>{

    //destructuring some info from request
    const {  
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
                 }=req.body;
 
  //creating a order
  const order=await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user:req.user._id,//only logged in usr can place order,grab his id from req.user
  });  

  res.status(201).json({
    success:true,
    order,
  });

  });


  // -----------Get single order(order details)--ADMIN-----------
 // to see single order details 
  exports.getSingleOrder=catchAsyncErrors(
     async(req,res,next)=>{
      //find order and populate name and email of user in order
      const order=await Order.findById(req.params.id).populate("user","name email");

      if(!order){
        return next(
          new ErrorHandler('Order not found with this Id',404)
        );
      }
      res.status(200).json({
        success:true,
        order,
      });
     }
  );

// ---------------- Get logged in user orders---------------------
//if logged in user want to see his/her orders
   exports.myOrders=catchAsyncErrors(
    async(req,res,next)=>{
      //find all orders in db whose id matches with user in req(logged in user)
     const orders=await Order.find({user:req.user._id});

     res.status(200).json({
       success:true,
       orders,
     });
     });


//  -----------------get all orders--ADMIN---------
//if admin want to see all orders placed on the site
exports.getAllOrders=catchAsyncErrors(
  async(req,res,next)=>{
   const orders=await Order.find();//will find all orders

   //finding total amount of orders,to show to admin in dashboard
   let totalAmount=0;
   orders.forEach((order)=>{
    totalAmount += order.totalPrice;
   });

   res.status(200).json({
     success:true,
     totalAmount,
     orders,
   });
   });

