const express=require('express');
const { registerUser } = require('../controllers/userController');
const router=express.Router();

//regiter user route
router.route('/register').post(registerUser);

module.exports=router;