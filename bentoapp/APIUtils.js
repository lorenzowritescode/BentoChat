let baseUrl = 'http://10.100.85.97:3000/',
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
        .then((response) => {
            return response.json();

        })
        .then((response) => {
            return response['auth_token'];
        })
        .catch((error) => {
            console.warn(error, error.message);
            throw error;
        });
}

module.exports = {
    login
};
