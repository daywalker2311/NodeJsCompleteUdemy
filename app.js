const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

const MONGODB_URI = 'mongodb+srv://mern123:mern123@devconnector.ux9ev.mongodb.net/shop?retryWrites=true&w=majority';

//added mongoose for handling data and DB, its an (O)bject (D)ocument (M)apper like ORM
const mongoose = require('mongoose');

const User = require('./models/user');

const app = express();
//initializing mongodb connection with session
const store = new MongoDbStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const ErrorController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//implementing session in order to validate user in backend instead of using cookies in browser
app.use(session({ secret: 'my long secret key', resave: false, saveUninitialized: false, store: store }));

app.use(csrfProtection);

app.use((req, res, next) => {
    console.log("called")
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            //console.log("updated user data : ", req.user);
            next();
        })
        .catch(err => {
            console.log(err);
        })
})

//adding values to be passed in all the rendered views via locals available to res obj
app.use((req, res, next) => {
    console.log("csrfToken: ", req.csrfToken());
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
})


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(ErrorController.get404Page);


mongoose.connect(MONGODB_URI)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log("mongoose.connect err", err));

