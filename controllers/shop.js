//const products = [];
const Product = require('../models/product');
const User = require('../models/user');


exports.getProducts = (req, res, next) => {
    Product.fetchAll().then((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    })
        .catch(err => {
            console.log("getProducts err ,", err);
        });
}

exports.getProduct = (req, res, next) => {
    //fetching the productId from params of the req
    const prodId = req.params.productId;

    Product.findById(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                path: '/products',
                pageTitle: product.title,
                product: product
            })
        })
        .catch(err => {
            console.log("getProduct err : ", err);
        })
}


exports.getIndex = (req, res, next) => {
    console.log("getIndex() called");
    Product.fetchAll().then((products) => {
        //console.log("getIndex() products: ", products);

        res.render('shop/index', {
            prods: products,
            pageTitle: 'Index Page',
            path: '/',
        });
    })
        .catch(err => {
            console.log("getIndex err ,", err);
        });
}

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(products => {
            console.log("insides of cart : ", products);
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            });
        })
        .catch(err => {
            console.log("getCart() err : ", err);
        });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);

    Product.findById(prodId)
        .then((product) => {
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log("postCart() result : ", result);
            res.redirect('/cart');
        })
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

exports.postOrder = (req, res, next) => {
    req.user.addOrder()
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log("postOrder err: ", err));
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    req.user.deleteItemFromCart(prodId)
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err)
        })
}