//const products = [];
const Product = require('../models/product');
const Cart = require('../models/cart');

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
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];

            for (const product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);

                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }

            }
            console.log(cartProducts);
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            });
        })
    })

}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    })
    res.redirect('/cart');
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

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    })

}