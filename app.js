const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

//added mongoose for handling data and DB, its an (O)bject (D)ocument (M)apper like ORM
const mongoose = require('mongoose');

const User = require('./models/user');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const ErrorController = require('./controllers/error');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('61b8b84e09faa52c652004cd')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            console.log("updated user data : ", req.user);
            next();
        })
        .catch(err => {
            console.log(err);
        })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(ErrorController.get404Page);

mongoose.connect('mongodb+srv://mern123:mern123@devconnector.ux9ev.mongodb.net/shop?retryWrites=true&w=majority')
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log("mongoose.connect err", err));

