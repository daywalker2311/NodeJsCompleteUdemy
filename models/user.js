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
        console.log("in add to cart method");

        const cartProductIndex = this.cart.items.findIndex(cp => {
            console.log(cp.productId, product._id);
            return cp.productId.toString() === product._id.toString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];
        console.log("index : ", cartProductIndex);
        if (cartProductIndex >= 0) {
            //increase quantity of the product in cart
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            //add new product to the cart
            updatedCartItems.push({
                productId: new ObjectId(product._id),
                quantity: newQuantity
            });
        }

        const updatedCart = { items: updatedCartItems };
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