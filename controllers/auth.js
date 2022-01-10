const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
    //const isLoggedIn = req.get('Cookie').trim().split('=')[1];
    console.log(req.session.isLoggedIn);

    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isLoggedIn: req.session.isLoggedIn,
    });
};

exports.postLogin = (req, res, next) => {
    //res.setHeader('Set-Cookie', 'loggedIn=true');
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.redirect('/login');
            }

            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err)
                            res.redirect('/');
                        })
                    }
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log("bcrypt compare err : ", err);
                })
        })
        .catch(err => { console.log("postLogin error : ", err) });

}

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',

    })
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({ email: email }).then(userDoc => {
        if (userDoc) {
            return res.redirect('/signup');
        }
        //using bcrypt to convert the password into an encrypted format
        return bcrypt.hash(password, 12)
            .then(hashedPassword => {
                const user = new User({
                    email: email,
                    password: hashedPassword,
                    cart: { items: [] }
                });
                return user.save();
            })
            .then(result => {
                res.redirect('/login');
            });
    })

        .catch(err => console.log("postSignup err ", err));
}