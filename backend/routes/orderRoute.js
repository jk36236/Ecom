const express=require('express');
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const router= express.Router();
const { isAuthenticatedUser,authorizeRoles } = require('../middleware/auth');


//routes of order
//creating a new order route
router.route('/order/new').post(isAuthenticatedUser,newOrder);

//getting single order details 
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);
//getting Logged in user details
router.route('/orders/me').get(isAuthenticatedUser,myOrders);

//get all orders---ADMIN
router.route('/admin/orders').get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);

//update order status--ADMIN
router.route('/admin/order/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateOrderStatus);

//delete order--ADMIN
router.route('/admin/order/:id').delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);


module.exports=router;