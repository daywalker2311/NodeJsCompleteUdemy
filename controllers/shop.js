//const products = [];
const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
    //console.log("in another middleware");
    //console.log("shop.js", adminData.products);
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    });
}

exports.getProduct = (req, res, next) => {
    //fetching the productId from params of the req
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        console.log(product);

        res.render('shop/product-detail', {
            path: '/products',
            pageTitle: product.title,
            product: product
        })
    })
    //console.log("id here : ", prodId);
    //res.redirect('/');
}


exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Index Page',
            path: '/',
        });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
}