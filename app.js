const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

//middleware function implemented use app.use
app.use('/add-product', (req, res, next) => {
    //console.log("in the middleware");
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>');

    //next();//this allows the request to continue to the next middleware
})

app.post('/product', (req, res, next) => {
    console.log(req.body)
    res.redirect('/');
})

app.use('/', (req, res, next) => {
    //console.log("in another middleware");
    res.send('<h1>mamacita, como te va</h1>')
})

app.listen(3000)

