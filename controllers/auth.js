const User = require('../models/user');

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
    User.findById('61bb9b2101a9e209635c1ae9')
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save(err => {
                console.log(err)
                res.redirect('/');
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
        isLoggedIn: req.session.isLoggedIn,

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
        const user = new User({
            email: email,
            password: password,
            cart: { items: [] }
        });
        return user.save();
    })
        .then(result => {
            res.redirect('/login');
        })
        .catch(err => console.log("postSignup err ", err));
}