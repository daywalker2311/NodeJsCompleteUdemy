const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

//using router method provided by express lib, to be used as a pluggable 
//and singleton instance to be used for ROUTING purposes
const router = express.Router();

const products = [];

//middleware function implemented use app.use
//  /admin/add-product => GET 
router.get('/add-product', (req, res, next) => {
    //console.log("in the middleware");
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))

    //next();//this allows the request to continue to the next middleware
})

//  /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
})

exports.router = router;
exports.products = products;

