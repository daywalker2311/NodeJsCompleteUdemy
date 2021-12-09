const path = require('path');

const express = require('express');

const AdminController = require('../controllers/admin');


//using router method provided by express lib, to be used as a pluggable 
//and singleton instance to be used for ROUTING purposes
const router = express.Router();


//middleware function implemented use app.use
//  /admin/add-product => GET 
router.get('/add-product', AdminController.getAddProduct);

//  /admin/products => GET 
router.get('/products', AdminController.getProducts);

//  /admin/add-product => POST
router.post('/add-product', AdminController.postAddProduct);

router.get('/edit-product/:productId', AdminController.getEditProduct);

//exports.router = router;
//exports.products = products;
module.exports = router;
