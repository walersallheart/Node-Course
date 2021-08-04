const http = require('http');

const express = require('express');

const app = new express();

//anything with .use will be run with all incoming requests
app.use((res, req, next) => {
    console.log('In the middleware!');
    next(); //Allows the request to continue to the next use() function middleware
});

app.use((res, req, next) => {
    console.log('In another middleware!');
});

const server = http.createServer(app);

server.listen(3000);
