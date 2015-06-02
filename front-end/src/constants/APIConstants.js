var host = 'localhost',
    port = '3000',
    url = 'http://'+ host + ':' + port + '/',
    LOGIN_URL = url + 'login',
    REGISTER_URL = url + 'register';
    chatUrl = url + 'chat',
    todoUrl = url + 'todo',
    wikiUrl = url + 'wiki';

module.exports = {
    url: url,
    chatUrl: chatUrl,
    todoUrl: todoUrl,
    wikiUrl: wikiUrl,
    LOGIN_URL: LOGIN_URL,
    REGISTER_URL: REGISTER_URL
};
