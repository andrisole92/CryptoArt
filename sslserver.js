const fs = require('fs');
const path = require('path')

const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const utils = require('web3-utils');

const mongo = require('./server/mongo');
//
// const privateKey  = fs.readFileSync('./sslcert/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('./sslcert/fullchain.pem', 'utf8');
const options = {
    // key: fs.readFileSync('./sslcert/privkey.pem'),
    // cert: fs.readFileSync('./sslcert/fullchain.pem')
};
// const credentials = {key: privateKey, cert: certificate};
const express = require('express');
const app = express();

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

httpServer.listen(80);
httpsServer.listen(443);

let allowCrossDomain = function(req, res, next) {
    console.log('allow');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(express.static(path.join(__dirname, 'build')));
app.use(require('helmet')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(allowCrossDomain);


//Force https
// app.use(function (req, res, next) {
//     if (!req.secure) {
//         return res.redirect(['https://', req.get('Host'), req.url].join(''));
//     }
//     next();
// });

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.post('/signup', function (req, res) {
    let body = req.body;
    if (!utils.isAddress(body.address) || body.email.length > 100 || body.fullName.length > 100){
        res.send(JSON.stringify({error: true}));
        return;
    }
    mongo.addUser(body.address, body.email, body.fullName).then((r) => {
        if (r) {
            res.send(JSON.stringify(r))
        } else {
            res.send(JSON.stringify({error: true}))
        }
    }).catch((e)=>{
        res.send(JSON.stringify({error: true}))
    })
});


app.post('/updateAccount', function (req, res) {
    let body = req.body;
    if (!utils.isAddress(body.address)){
        res.send(JSON.stringify({error: true}));
        return;
    }
    mongo.updateUser(body.address, body.o).then((r) => {
        if (r) {
            res.send(JSON.stringify(r))
        } else {
            res.send(JSON.stringify({error: true}))
        }
    })
});

app.post('/user', (req, res) => {
    let body = req.body;
    mongo.getUser(body.address).then((r) => {
        if (r) {
            res.send(JSON.stringify(r))
        } else {
            res.send(JSON.stringify({error: true}))
        }

    })

});


app.post('/tokenBought', function (req, res) {

});