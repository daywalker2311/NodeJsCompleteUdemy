const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);

app.use('/', (req, res, next) => {
    //console.log("in another middleware");
    res.send('<h1>mamacita, como te va</h1>')
})

app.listen(3000)

