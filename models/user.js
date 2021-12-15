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

    getCart() {
        console.log("getCart", this.cart);
        const db = getDb();
        const productIds = this.cart.items.map(item => {
            return item.productId;
        })
        return db
            .collection('products')
            .find({ _id: { $in: productIds } })
            .toArray()
            .then(products => {
                return products.map(p => {
                    return {
                        ...p, quantity: this.cart.items.find(i => {
                            return i.productId.toString() === p._id.toString()
                        }).quantity
                    };
                });
            })
            .catch(err => { console.log('User getCart() err', err) });
    }

    deleteItemFromCart(id) {
        const updatedCartItems = this.cart.items.filter(prod => {
            return prod.productId.toString() !== id.toString()
        })

        console.log("udpatedCartItems : ", updatedCartItems);

        const db = getDb();
        return db
            .collection('users')
            .updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { cart: { items: updatedCartItems } } });

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