'use strict'  
const app = require('express')(),
      server = require('http').Server(app),
      port = process.env.PORT || 3000,
      auth = require('./auth.js'),
      db = require('./db.js'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      io = require('./socket-config.js')(server),
      multer = require('multer'); 

app.configure( function () {
    cors();
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:8000");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    })
    // This is for decoding json POST requests
    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
      extended: true
    }));
    app.use(multer()); // for parsing multipart/form-data
    auth.init(app);
    db.setup();
});

app.get('/register', function (req, res) {
    var account = {
        givenName: 'Joe',
        surname: 'Stormtrooper',
        username: 'tk421',
        email: 'tk421@stormpath.com',
        password: 'Changeme1',
        customData: {
            favoriteColor: 'white',
        }
    };

    auth.createAccount(account, function (err, res) {
        console.log('YAYYY');
    })
})

app.get('/login', function (req, res) {
    auth.login('tk421', 'Changeme1', function (err, result) {
        if (err) throw err;

        res.send(result.account)
    })
})

app.post('/chat', function (req, res) {
    var msg = req.body;

    if (require('./util').checkMessage(msg)) {
        db.saveMessage(msg, function (err, success) {
            if (!err && success)
                res.status(201).end('Created')
            else
                res.status(500).end('Internal Error' + err.message)
        })
    }
})

app.get('/chat', function (req, res) {
    db.findMessages(100, function (err, result) {
        if (!err)
            res.status(200).send(result).end();
        else
            res.status(500).end('Internal Database Error');
    })
})

server.listen(port);  
console.log('listening on port ' + port);  