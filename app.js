const express = require('express');
const bodyParser = require('body-parser');

const app = new express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//allows us to parse incoming get/post requests
app.use(bodyParser.urlencoded({extended:false}));

//prefaces /admin to all routes in the adminRoutes urls
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//having no path works for anything not found in any other path
app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3000);