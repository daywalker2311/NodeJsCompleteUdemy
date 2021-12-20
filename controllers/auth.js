const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    //const isLoggedIn = req.get('Cookie').trim().split('=')[1];
    console.log(req.session.isLoggedIn);

    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isLoggedIn: false,
    });
};

exports.postLogin = (req, res, next) => {
    //res.setHeader('Set-Cookie', 'loggedIn=true');
    User.findById('61bb9b2101a9e209635c1ae9')
        .then(user => {
            req.session.isLoggedIn = true;
            req.user = user;
            res.redirect('/');
        })
        .catch(err => { console.log("postLogin error : ", err) });

}

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}