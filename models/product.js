const products = [];
const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');

const getProductsFromFile = (cb) => {

    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        }

        cb(JSON.parse(fileContent));
    })
}

module.exports = class Product {

    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })
        })

        //products.push(this);
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
        //return products;
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        })
    }


}