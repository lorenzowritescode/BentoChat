let baseUrl = 'http://localhost:3000/',
    loginUrl = baseUrl + 'login';

function login (email, pwd) {
    return fetch(loginUrl, {
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
    })
        .then((response) => response.text())
        .then((responseText) => {
            return responseText['auth_token'];
        })
        .catch((error) => {
            console.warn(error, error.message);
            throw error;
        });
}

module.exports = {
    login
};