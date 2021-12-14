const getDb = require('../util/database').getDb;

const mongoDb = require('mongodb');
const ObjectId = mongoDb.ObjectId;

module.exports = class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id;

    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this)
            .then((result) => {
                console.log("User.save obj result : ", result);
            })
            .catch(err => { console.log(err) });;
    }

    addToCart(product) {
        // const cartProduct = this.cart.items.findIndex(cp => {
        //     return cp._id === product._id;
        // });
        console.log("in add to cart method", this);
        const updatedCart = { items: [{ ...product, quantity: 1 }] };
        const db = getDb();
        return db
            .collection('users')
            .updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { cart: updatedCart } });
    }

    static findById(id) {
        const db = getDb();

        return db.collection('users').findOne({ _id: new ObjectId(id) })
            .then(user => {
                console.log("result user findbyid", user);
                return user;
            })
            .catch(err => {
                console.log(err);
            });
    }
}