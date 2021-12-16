const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);

// const mongoDb = require('mongodb');

// const getDb = require('../util/database').getDb;
// module.exports = class Product {

//     constructor(title, imageUrl, price, description, id, userId) {
//         this.title = title;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this.price = price;
//         this._id = id ? new mongoDb.ObjectId(id) : null;
//         this.userId = userId;
//     }

//     save() {
//         const db = getDb();
//         let dbOp;
//         //db.collection('products').insertOne({name:'Jitsu', price:1133.33});
//         if (this._id) {
//             //update the product
//             dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this });
//         } else {
//             //add the product
//             dbOp = db.collection('products')
//                 .insertOne(this);
//         }
//         return dbOp
//             .then((result) => {
//                 console.log("save obj result : ", result);
//             })
//             .catch(err => { console.log(err) });
//     }

//     static fetchAll() {
//         const db = getDb();

//         return db.collection('products')
//             .find().toArray()
//             .then(result => {
//                 console.log("fetchAll result : ", result);
//                 return result;
//             })
//             .catch(err => { console.log(err) });
//     }

//     static findById(id) {
//         const db = getDb();

//         return db.collection('products').find({ _id: new mongoDb.ObjectId(id) }).next()
//             .then(result => {
//                 console.log("findById result: ", result);
//                 return result;
//             })
//             .catch(err => { console.log(err) });
//     }

//     static deleteById(id) {
//         const db = getDb();

//         return db.collection('products').deleteOne({ _id: new mongoDb.ObjectId(id) })
//             .then(result => {
//                 return result;
//             })
//             .catch(err =>
//                 console.log(err));
//     }
// }