//const products = [];
const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    //find() provided by Mongoose fetches all products, if the list is huge, cursor should be used 
    Product.find().then((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
            isLoggedIn: req.isLoggedIn,
        });
    })
        .catch(err => {
            console.log("getProducts err ,", err);
        });
}

exports.getProduct = (req, res, next) => {
    //fetching the productId from params of the req
    const prodId = req.params.productId;

    //again findById() provided by Mongoose
    Product.findById(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                path: '/products',
                pageTitle: product.title,
                product: product,
                isLoggedIn: req.isLoggedIn,
            })
        })
        .catch(err => {
            console.log("getProduct err : ", err);
        })
}


exports.getIndex = (req, res, next) => {
    console.log("getIndex() called");
    Product.find().then((products) => {
        //console.log("getIndex() products: ", products);

        res.render('shop/index', {
            prods: products,
            pageTitle: 'Index Page',
            path: '/',
            isLoggedIn: req.isLoggedIn,
        });
    })
        .catch(err => {
            console.log("getIndex err ,", err);
        });
}

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .then(result => {
            const products = result.cart.items;
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products,
                isLoggedIn: req.isLoggedIn,
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
        pageTitle: 'Checkout',
        isLoggedIn: req.isLoggedIn,
    })
}

exports.getOrders = (req, res, next) => {

    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            console.log("orderData getOrdes : ", orders);

            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders,
                isLoggedIn: req.isLoggedIn,
            });
        })
        .catch(err => console.log("getOrders Controller error ", err));
}

exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .then(result => {
            const products = result.cart.items.map(item => {
                return {
                    //using spread operator and mongoose provided _doc field we can pull the whole document
                    product: { ...item.productId._doc },
                    quantity: item.quantity
                }
            });
            console.log("postOrder result : ", products);

            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: products
            })

            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => console.log("postOrder err: ", err));
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    req.user.removeFromCart(prodId)
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err)
        })
}