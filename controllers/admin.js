const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    console.log("in the add-product");
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'))

    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formCSS: true,
        productCSS: true,
        activeAddProduct: true
    });

    //next();//this allows the request to continue to the next middleware
}

exports.postAddProduct = (req, res, next) => {
    //products.push({ title: req.body.title });
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, price, description);
    product.save();

    res.redirect('/');
}


exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: 'admin/products',
        });
    });
}