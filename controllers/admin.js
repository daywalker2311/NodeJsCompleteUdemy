const Product = require('../models/product');

const fileHelper = require('../util/file');

exports.getAddProduct = (req, res, next) => {
    console.log("in the add-product");
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'))

    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });

    //next();//this allows the request to continue to the next middleware
}

exports.postAddProduct = (req, res, next) => {
    //products.push({ title: req.body.title });
    const title = req.body.title;
    const imageUrl = req.file;
    const price = req.body.price;
    const description = req.body.description;
    console.log("image data : ", req.file);

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl.path,
        userId: req.user
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
                product: product,
            });

        })
        .catch((err) => { console.log("getEditProduct() err : ", err) })

    //next();//this allows the request to continue to the next middleware
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const image = req.file;
    const updatedDescription = req.body.description;

    Product
        .findById(prodId)
        .then(product => {
            if (product.userId.toString() !== req.user._id.toString()) {
                return res.redirect('/');
            }
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDescription;

            if (image) {
                fileHelper.deleteFile(product.imageUrl);
                product.imageUrl = image.path;
            }
            return product.save().then(result => {
                console.log('product updated');
                res.redirect('/admin/products');
            });

        })
        .catch(err => {
            console.log("postEditProduct err : ", err);
        })
}


exports.getProducts = (req, res, next) => {
    Product
        .find()
        //more helper functions 
        //select particular data from the resultset
        //.select('title price -_id')
        //populates the data within the resultset based of their Ids
        //.populate('userId')
        .then((products) => {
            console.log("products are here : ", products);

            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',
            });
        });
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(prod => {
            if (!prod) {
                return next(new Error('product not found'));
            }
            fileHelper.deleteFile(prod.imageUrl);
            return Product.deleteOne({ _id: prodId, userId: req.user._id });
        })
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log("postDetelePRodcut err : ", err));



}