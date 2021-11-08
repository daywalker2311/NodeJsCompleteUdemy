const path = require('path')

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const adminData = require('./admin');

router.get('/', (req, res, next) => {
    //console.log("in another middleware");
    //console.log("shop.js", adminData.products);
    const products = adminData.products;

    res.render('shop', { prods: products, docTitle: 'Shopppe' })
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'))
})


module.exports = router;