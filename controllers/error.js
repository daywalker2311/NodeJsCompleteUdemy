exports.get404Page = (req, res, next) => {
    res.status(404).render('404', {
        path: '/404', pageTitle: 'Page Nawwt found',
        isLoggedIn: req.isLoggedIn,
    });
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
}