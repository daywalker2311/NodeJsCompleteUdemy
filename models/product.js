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
        return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?,?,?,?)',
            [this.title,
            this.price,
            this.imageUrl,
            this.description]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');

    }

    static findById(id) {
        return db.execute('SELECT * FROM products WHERE id = ?', [id]);
    }

    static deleteById(id) {

    }


}