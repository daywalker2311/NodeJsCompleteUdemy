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
    req.session.isLoggedIn = true;
    res.redirect('/');

}