const db = require('../util/database');

const Cart = require('./cart');
module.exports = class Product {

    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    }

    save() {

    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');

    }

    static findById(id) {

    }

    static deleteById(id) {

    }


}