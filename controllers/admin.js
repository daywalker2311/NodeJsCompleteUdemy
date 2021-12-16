const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    console.log("in the add-product");
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'))

    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });

    //next();//this allows the request to continue to the next middleware
}

exports.postAddProduct = (req, res, next) => {
    //products.push({ title: req.body.title });
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
    })

    //save() provided by Mongoose this time !!! and we can just use it on Product object
    product.save()
        .then(result => {
            console.log("created product");
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });


}

exports.getEditProduct = (req, res, next) => {
    console.log("in the edit-product");
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });

        })
        .catch((err) => { console.log("getEditProduct() err : ", err) })

    //next();//this allows the request to continue to the next middleware
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;

    Product
        .findById(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDescription;
            product.imageUrl = updatedImageUrl;

            return product.save();

        }).then(result => {
            console.log("product updated");
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log("postEditProduct err : ", err);
        })
}


exports.getProducts = (req, res, next) => {
    Product.find().then((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    });
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    Product
        .findByIdAndRemove(prodId)
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log("postDetelePRodcut err : ", err));
}