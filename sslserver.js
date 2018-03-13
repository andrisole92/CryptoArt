const fs = require('fs');
const path = require('path')

const http = require('http');
const https = require('https');
//
// const privateKey  = fs.readFileSync('./sslcert/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('./sslcert/fullchain.pem', 'utf8');
const options = {
    key: fs.readFileSync('./sslcert/privkey.pem'),
    cert: fs.readFileSync('./sslcert/fullchain.pem')
};
// const credentials = {key: privateKey, cert: certificate};
const express = require('express');
const app = express();

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

httpServer.listen(8082);
httpsServer.listen(8081);

app.use(express.static(path.join(__dirname, 'build')));
app.use(require('helmet')());


//Force https
app.use(function(req, res, next) {
    if(!req.secure) {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});