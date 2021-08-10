const express = require('express');
const bodyParser = require('body-parser');

const app = new express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//allows us to parse incoming get/post requests
app.use(bodyParser.urlencoded({extended:false}));

app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000);
