const Cart = require('./cart');
const getDb = require('../util/database').getDb;
module.exports = class Product {

    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    }

    save() {
        const db = getDb();
        //db.collection('products').insertOne({name:'Jitsu', price:1133.33});
        return db.collection('products')
            .insertOne(this)
            .then((result) => {
                console.log("save obj result : ", result);
            })
            .catch(err => { console.log(err) });
    }

    static fetchAll() {
        const db = getDb();

        return db.collection('products')
            .find().toArray()
            .then(result => {
                console.log("fetchAll result : ", result);
                return result;
            })
            .catch(err => { console.log(err) });
    }

    static findById(id) {
    }

    static deleteById(id) {

    }
}