const express=require('express');
const { registerUser, loginUser, logout } = require('../controllers/userController');
const router=express.Router();

//regiter,login,logout user route
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);

module.exports=router;