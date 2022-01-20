//const products = [];
const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');

const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');


exports.getProducts = (req, res, next) => {
    //find() provided by Mongoose fetches all products, if the list is huge, cursor should be used 
    Product.find().then((products) => {
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

    //again findById() provided by Mongoose
    Product.findById(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                path: '/products',
                pageTitle: product.title,
                product: product,
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
                    email: req.user.email,
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

exports.getInvoice = (req, res, next) => {
    const orderId = req.params.orderId;

    Order.findById(orderId)
        .then(order => {
            if (!order) {
                return next(new Error('No orders found'));
            }
            if (order.user.userId.toString() !== req.user._id.toString()) {
                return next(new Error('Unauthorized'));
            }
            const invoiceName = 'invoice-' + orderId + '.pdf';
            const invoicePath = path.join('data', 'invoices', invoiceName);

            const pdfDoc = new PDFDocument();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader(
                'Content-Disposition',
                'inline; filename= "' + invoiceName + '"'
            );
            pdfDoc.pipe(fs.createWriteStream(invoicePath));
            pdfDoc.pipe(res);

            pdfDoc.text('yo waddup?');

            pdfDoc.end();
            //1
            //this way the file will be read/preload in Memory and then returned as a restponse
            //this is an expensive way of handling file
            //larger files will take forever to send response
            //
            // fs.readFile(invoicePath, (err, data) => {
            //     if (err) {
            //         return next(err);
            //     }
            //     res.setHeader('Content-Type', 'application/pdf');
            //     res.setHeader('Content-Disposition', 'attachment; filename= "' + invoiceName + '"');
            //     res.send(data);
            // });

            //2
            //using Stream method for handling files
            //creates a stream and downloads the file step by step as chunks
            //browser concatenates the data chunks into one file
            // const file = fs.createReadStream(invoicePath);

            // res.setHeader('Content-Type', 'application/pdf');
            // res.setHeader(
            //     'Content-Disposition',
            //     'attachment; filename= "' + invoiceName + '"'
            // );
            // //response is a writable stream so we can pipe the result to response stream as below
            // file.pipe(res);
        })
        .catch(err => console.log("getInvoice err : ", err));
}