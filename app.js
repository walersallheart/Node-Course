const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

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
    res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'));
});

app.listen(3000);