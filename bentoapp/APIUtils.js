var React = require('react-native'),
    {AsyncStorage} = React;

let baseUrl = 'http://localhost:3000/',
    loginUrl = baseUrl + 'login',
    chatUrl = baseUrl + 'chat';

function handle (p) {
    return p.then((response) => {
        return response.json();

    });
}
function login (email, pwd) {
    return handle(
        fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Host': ''
            },
            body: JSON.stringify({
                email: email,
                password: pwd
            })
        }))
        .then((response) => {
            return response['auth_token'];
        })
        .catch((error) => {
            console.warn(error, error.message);
            throw error;
        });
}

function getMessages () {
    return AsyncStorage.getItem('jwt')
        .then((jwt) => {
            return handle(fetch(chatUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Origin': '',
                    'Host': ''
                },
                body: JSON.stringify({
                        auth_token: jwt
                    })
                }))
                .then(function (data) {
                    console.log('GOT SOME MESSAGES', data);
                    return data;
                }).catch((error) => {
                    console.warn(error);
                })
        })
}

module.exports = {
    login, getMessages
};