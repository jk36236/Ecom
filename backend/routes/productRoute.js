const express=require('express');
const router= express.Router();
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const { isAuthenticatedUser } = require('../middleware/auth');

//get all products route --READ
router.route('/products').get(getAllProducts);
//create product route-- ye admin route hai--CREATE
router.route('/product/new').post(isAuthenticatedUser,createProduct);

//update product route--UPDATE --ADMIN
router.route('/product/:id').put(isAuthenticatedUser,updateProduct);

//delete product route--DELETE -- ADMIN
router.route('/product/:id').delete(isAuthenticatedUser,deleteProduct);

//get singlepdt details
router.route('/product/:id').get(getProductDetails);

module.exports=router;
