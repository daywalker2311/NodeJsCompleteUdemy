module.exports = (req, res, next) => {
    console.log("in middleware");
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
}