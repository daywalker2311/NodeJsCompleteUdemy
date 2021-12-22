const path = require('path');

const express = require('express');

const AdminController = require('../controllers/admin');

//implmented middleware function to check if the user is authenticated or not
const isAuth = require('../middleware/is-auth');

//using router method provided by express lib, to be used as a pluggable 
//and singleton instance to be used for ROUTING purposes
const router = express.Router();


//middleware function implemented use app.use
//  /admin/add-product => GET 
router.get('/add-product', isAuth, AdminController.getAddProduct);

// //  /admin/products => GET 
router.get('/products', isAuth, AdminController.getProducts);

// //  /admin/add-product => POST
router.post('/add-product', isAuth, AdminController.postAddProduct);

//passing the middleware function isAuth as a first parameter.
//the functions will be called from left to right 
router.get('/edit-product/:productId', isAuth, AdminController.getEditProduct);

router.post('/edit-product', isAuth, AdminController.postEditProduct);

router.post('/delete-product', isAuth, AdminController.postDeleteProduct);


//exports.router = router;
//exports.products = products;
module.exports = router;
