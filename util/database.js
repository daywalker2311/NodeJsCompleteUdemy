const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://mern123:mern123@devconnector.ux9ev.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        .then(result => {
            console.log('MongoDB Connected!!!!');
            callback(result);
        })
        .catch(err => {
            console.log(err)
        });
}

module.exports = mongoConnect;

