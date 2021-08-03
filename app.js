const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    //process.exit(); //close the node server

    res.setHeader('Content-Type', 'text/html');
    res.write(`
        <html>
            <head><title>My First Page</title></head>
            <body><h1>Hello world</h1></body>
        </html>
    `);
    res.end();
});

server.listen(3000)