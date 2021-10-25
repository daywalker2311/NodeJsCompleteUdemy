const express = require('express');

//using router method provided by express lib, to be used as a pluggable 
//and singleton instance to be used for ROUTING purposes
const router = express.Router();


//middleware function implemented use app.use
//  /admin/add-product => GET 
router.get('/add-product', (req, res, next) => {
    //console.log("in the middleware");
    res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>');

    //next();//this allows the request to continue to the next middleware
})

//  /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    console.log(req.body)
    res.redirect('/');
})
module.exports = router;
