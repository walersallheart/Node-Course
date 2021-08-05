const express = require('express');

const app = new express();

//anything with .use will be run with all incoming requests
app.use((req, res, next) => {
    console.log('In the middleware!');
    next(); //Allows the request to continue to the next use() function middleware
});

app.use((req, res, next) => {
    console.log('In another middleware!');

    res.send('<h1>Hello from express</h1>');
});

app.listen(3000);
