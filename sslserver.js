const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');

const https = require('https');

const app = express();

let certOpts = {
    key: fs.readFileSync('./sslcert/privkey.pem'),
    cert: fs.readFileSync('./sslcert/fullchain.pem')
};
https.createServer({}, app).listen(9090);

app.use(express.static(path.join(__dirname, 'build')));
app.use(require('helmet')());

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


let httpApp = express();
let httpServer = http.createServer(httpApp);

httpApp.use(express.static(path.join(__dirname, 'build')));

// set up a route to redirect http to https
httpApp.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

httpServer.listen(80);

// module.exports = app;
