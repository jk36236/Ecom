const Product= require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors= require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');

//create product-ADMIN --CREATE
//catchAsyncErrors to handle asynchronous errors
exports.createProduct = catchAsyncErrors(
  async(req,res,next)=>{
    const product= await Product.create(req.body);
    res.status(201).json({
      success:true,
      product
    })
  }
);



//get all products --READ
exports.getAllProducts=catchAsyncErrors(
  async(req,res)=>{
    const resultPerPage=5;
    const productCount= await Product.countDocuments();//maintain vount of prdts

const apiFeature= new ApiFeatures(Product.find(),req.query)
.search()
.filter()
.pagination(resultPerPage);
  // const products= await Product.find();
  const products= await apiFeature.query;

  res.status(200).json({
    success:true,
    products
  })
});

//get product details- SINGLE PRODUCT
exports.getProductDetails= catchAsyncErrors(
  async(req,res,next)=>{
  //find pdt by id
  const product= await Product.findById(req.params.id);

//if not found
if(!product){
  return next(new ErrorHandler("Product not found",404));
}
// if found-send pdt details
res.status(200).json({
  success:true,
  product,
  productCount
}) 
});

//update products--UPDATE--ADMIN
exports.updateProduct= catchAsyncErrors(
  async(req,res,next)=>{
 let product= await Product.findById(req.params.id);//find product by id which has to be updated, grab id from params

 //if product not found
 if(!product){
  return next(new ErrorHandler("Product not found",404));
}

 //if found update it
 //id,update,options
 product= await Product.findByIdAndUpdate(req.params.id,req.body,{
  new:true,
  runValidators:true,
  useFindAndModify:false
});

//product has been updated ,return response with updated product
res.status(200).json({
  success:true,
  product //updated product
});

});




//DELETE PRODUCT -- ADMIN
exports.deleteProduct = catchAsyncErrors(
  async(req,res,next)=>{
  //find the product
 const product= await Product.findById(req.params.id);

 //if not found
 if(!product){
  return next(new ErrorHandler("Product not found",404));
}
 //if found delete it
 await product.remove();

 res.status(200).json({
  success:true,
  message:"Product deleted successfully"
 });
});