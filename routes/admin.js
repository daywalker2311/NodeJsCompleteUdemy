const path = require('path');

const express = require('express');

const ProductController = require('../controllers/products');


//using router method provided by express lib, to be used as a pluggable 
//and singleton instance to be used for ROUTING purposes
const router = express.Router();


//middleware function implemented use app.use
//  /admin/add-product => GET 
router.get('/add-product', ProductController.getAddProduct);

//  /admin/add-product => POST
router.post('/add-product', ProductController.postAddProduct);

//exports.router = router;
//exports.products = products;
module.exports = router;
