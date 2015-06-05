'use strict'
var stormpath = require('stormpath'),
    client = null,
    bentoApp = null,
    keyfile = require('path').resolve(__dirname, '.stormpath/apiKey.properties');


function init (app) {
    stormpath.loadApiKey(keyfile, function apiKeyFileLoaded (err, apiKey) {
        if (err) 
            throw err;
        
        client = new stormpath.Client({apiKey: apiKey});

        getBentoApp();
    })
}

function getBentoApp() {
    client.getApplications({name:'BentoChat'}, function(err, applications) {
        if (err) throw err;

        bentoApp = applications.items[0];
    })
}

/*
 * Callback takes 2 parameters: err and account
 */
function createAccount(account, callback) {
    if (bentoApp === null)
        throw new Error('the bentoApp was not found');

    bentoApp.createAccount(account, function (err, account) {
     callback(err, account);
 });
}

/*
 * Callback takes 2 parameters: err and result.
 * result has index `account'
 */
function accountLogin (username, password, callback) {
    bentoApp.authenticateAccount({
        username: username,
        password: password
    }, callback)
}

module.exports = {
    init: init,
    createAccount: createAccount,
    login: accountLogin
}