const Product= require('../models/productModel');

//create product-ADMIN --CREATE
exports.createProduct = async(req,res,next)=>{
  const product= await Product.create(req.body);
  res.status(201).json({
    success:true,
    product
  })
}



//get all products --READ
exports.getAllProducts=async(req,res)=>{

  const products= await Product.find();//will find all the products

  res.status(200).json({
    success:true,
    products
  })
}

//get product details- SINGLE PRODUCT
exports.getProductDetails= async(req,res,next)=>{
  //find pdt by id
  const product= await Product.findById(req.params.id);

//if not found
if(!product){
  return res.status(500).json({
    success:false,
    message:"product not found"
  });
}
// if found-send pdt details
res.status(200).json({
  success:true,
  product
})
}

//update products--UPDATE--ADMIN
exports.updateProduct= async(req,res,next)=>{
 let product= await Product.findById(req.params.id);//find product by id which has to be updated, grab id from params

 //if product not found
 if(!product){
  return res.status(500).json({
    success:false,
    message:"Product not found"
  })
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

}




//DELETE PRODUCT -- ADMIN
exports.deleteProduct = async(req,res,next)=>{
  //find the product
 const product= await Product.findById(req.params.id);

 //if not found
 if(!product){
  return res.status(500).json({
    success:false,
    message:"product not found"
  });
 }

 //if found delete it
 await product.remove();

 res.status(200).json({
  success:true,
  message:"Product deleted successfully"
 });
}