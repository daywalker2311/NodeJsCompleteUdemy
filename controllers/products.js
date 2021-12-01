const products = [];

exports.getAddProduct = (req, res, next) => {
    console.log("in the add-product");
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'))

    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formCSS: true,
        productCSS: true,
        activeAddProduct: true
    });

    //next();//this allows the request to continue to the next middleware
}

exports.postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
}