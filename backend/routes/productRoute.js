const express=require('express');
const router= express.Router();
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getAllReviews, deleteReview, getAdminProducts } = require('../controllers/productController');
const { isAuthenticatedUser,authorizeRoles } = require('../middleware/auth');

//get all products route --READ
router.route('/products').get(getAllProducts);

//get all products route --ADMIN
router.route('/admin/products').get(isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts);

//create product route-- ye admin route hai--CREATE
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

//update product route--UPDATE --ADMIN
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct);

//delete product route--DELETE -- ADMIN
router.route('/admin/product/:id').delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);

//get singlepdt details
router.route('/product/:id').get(getProductDetails);
//creating and updatating review route
router.route('/review').put(isAuthenticatedUser,createProductReview);
//get all reviews of a product route
router.route('/reviews').get(getAllReviews);
//delete a review route
router.route('/reviews').delete(isAuthenticatedUser,deleteReview);

module.exports=router;
