var host = 'localhost',
    port = '3000',
    url = 'http://'+ host + ':' + port + '/',
    chatUrl = url + 'chat',
    LOGIN_URL = url + 'login',
    REGISTER_URL = url + 'register';

module.exports = {
    url: url,
    chatUrl: chatUrl,
    LOGIN_URL: LOGIN_URL,
    REGISTER_URL: REGISTER_URL
};
