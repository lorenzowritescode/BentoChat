'use strict'  
const app = require('express')(),
      port = process.env.PORT || 3000,
      auth = require('./auth.js');

auth.init(app);

app.get('/register', function(req, res) {
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

    auth.createAccount(account, function(err, res) {
        console.log('YAYYY');
    })
})

app.get('/login', function(req, res) {
    auth.login('tk421', 'Changeme1', function (err, result) {
        if (err) throw err;

        res.send(result.account)
    })
})

app.listen(port);  
console.log('listening on port ' + port);  