const getDb = require('../util/database').getDb;

const mongoDb = require('mongodb');

module.exports = class User {
    constructor(username, email) {
        this.name = username;
        this.email = email;

    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this)
            .then((result) => {
                console.log("User.save obj result : ", result);
            })
            .catch(err => { console.log(err) });;
    }

    static findById(id) {
        const db = getDb();

        return db.collection('users').findOne({ _id: new mongoDb.ObjectId(id) })
            .then(user => {
                console.log("result user findbyid", user);
                return user;
            })
            .catch(err => {
                console.log(err);
            });
    }
}