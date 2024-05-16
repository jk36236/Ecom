const Product= require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors= require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');
const cloudinary=require('cloudinary');

//create product-ADMIN --CREATE
exports.createProduct = catchAsyncErrors(
  async(req,res,next)=>{

 //for images
 let images= [];

 //mtlb agar 1 he image h(string)
 if(typeof req.body.images === "string"){
   images.push(req.body.images);
 }
 else{
//agar poori array h images ki
  images=req.body.images;
 }

 const imagesLink=[];

 //upload every single image on cloudinary
 for(let i=0;i<images.length;i++){
  const result=await cloudinary.v2.uploader.upload(images[i],{
    folder:"products",
  });

  // storing links of all images inside imagesLink array
  imagesLink.push({
    public_id:result.public_id,
    url:result.secure_url,
  });
 }
    
    req.body.images=imagesLink;
    req.body.user=req.user.id;//assigning usr_id to user of prdtModel in request
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
    const resultPerPage=8;

    const productsCount= await Product.countDocuments();//maintain count of prdts to show in dashboard on frontend

const apiFeature= new ApiFeatures(Product.find(),req.query)
.search()

.filter()
let products= await apiFeature.query;
const filteredProductsCount=products.length;
apiFeature.pagination(resultPerPage);

  // const products= await Product.find();
   products= await apiFeature.query;

  res.status(200).json({
    success:true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  })
});



//get all products --ADMIN
exports.getAdminProducts=catchAsyncErrors(
  async(req,res)=>{
    const products= await Product.find();

  res.status(200).json({
    success:true,
    products,
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

//----------------for images -deleting old one and uploading new one------------------------
let images= [];
if(typeof req.body.images === "string"){
  images.push(req.body.images);
}
else{
 images=req.body.images;
}

//mtlb images h,then delete them from cloudinary
if(images !== undefined){
//deleteing images from cloudinary
for(let i=0;i<product.images.length;i++){
  await cloudinary.v2.uploader.destroy(product.images[i].public_id);
}

const imagesLink=[];

 //upload new images on cloudinary
 for(let i=0;i<images.length;i++){
  const result=await cloudinary.v2.uploader.upload(images[i],{
    folder:"products",
  });

   // storing links of all images inside imagesLink array
   imagesLink.push({
    public_id:result.public_id,
    url:result.secure_url,
  });
 }

 req.body.images=imagesLink;
}

// ----------------------------------------------------------------------------
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

//deleteing images from cloudinary
 for(let i=0;i<product.images.length;i++){
   await cloudinary.v2.uploader.destroy(product.images[i].public_id);
 }

 //if found delete it
 await product.remove();

 res.status(200).json({
  success:true,
  message:"Product deleted successfully"
 });
});

// ------------CREATE new review or UPDATE the review-------

exports.createProductReview=catchAsyncErrors(
  async(req,res,next)=>{
    //destructuring values from request
    const {rating,comment,productId}=req.body;

    const review={
      user:req.user._id,
      name:req.user.name,
      rating:Number(rating),
      comment,
    };

    //find product on which we have to create/update review
    const product=await Product.findById(productId);

    //check if the user has already given review on the product
    const isReviewed=product.reviews.find(
      (rev)=>rev.user.toString() === req.user._id.toString()
    );

    //if yes,then update the rating and comment with current rating and comment
    if(isReviewed){
    product.reviews.forEach((rev)=>{
      if(rev.user.toString() === req.user._id.toString())
       ( rev.rating=rating),
       (rev.comment=comment);
      
    });
    //else create a new review
    }else{
      product.reviews.push(review);
      product.numOfReviews=product.reviews.length;//updating no fo reviews count
    }

    //updating overall rating(ratings)
    let avg=0;
    product.reviews.forEach((rev)=>{
      avg+=rev.rating;
    });

    product.ratings=avg/product.reviews.length;

    await product.save({validateBeforeSave:false});

    res.status(200).json({
      success:true,
    });
  }
);

// -----------------GET ALL REVIEWS OF A PRODUCT------------
exports.getAllReviews=catchAsyncErrors(
  async(req,res,next)=>{
    const product=await Product.findById(req.query.id);//id-product ki h

    if(!product){
      return next(
        new ErrorHandler('Product not found',404)
      );
    }

    res.status(200).json({
      success:true,
      reviews:product.reviews,
    });
  }
);

// ---------------DELETE REVIEW------------------
exports.deleteReview=catchAsyncErrors(
  async(req,res,next)=>{

    const product=await Product.findById(req.query.productId);//product id from query

    if(!product){
      return next(
        new ErrorHandler('Product not found',404)
      );
    }

    //filter reviews which we dont want to delete
    const reviews=product.reviews.filter((rev)=>rev._id.toString() !== req.query.id.toString());//id-review ki h

    //updating overall rating(ratings), because 1 review got deleted
    let avg=0;
    product.reviews.forEach((rev)=>{
      avg += rev.rating;
    });

    const ratings= avg / product.reviews.length;
    const numOfReviews=reviews.length;//updating no of reviews

    //updating the product with new reviews,ratings and numof reviews(1 review deleted)
    await Product.findByIdAndUpdate(req.query.productId,
    {//what to update
      reviews,
      ratings,
      numOfReviews,
    },{
      //options
      new:true,
      runValidators:true,
      useFindAndModify:false,
    });

    res.status(200).json({
      success:true,
    });
  }
);