const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');

const https = require('https');

const app = express();

let certOpts = {
    cert: fs.readFileSync('./sslcert/fullchain.pem'),
    key: fs.readFileSync('./sslcert/privkey.pem')
};
https.createServer({}, app).listen(443);

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


let httpApp = express();
let httpServer = http.createServer(httpApp);


// set up a route to redirect http to https
httpApp.get('*', function(req, res) {
    res.redirect('https://' + req.headers.host + req.url);
});

httpServer.listen(80);

// module.exports = app;
