var host = 'localhost', //'178.62.82.220',
    port = '3000', //'8080',
    url = 'http://'+ host + ':' + port + '/',
    LOGIN_URL = url + 'login',
    REGISTER_URL = url + 'register',
    chatUrl = url + 'chat',
    groupsUrl = url + 'group',
    todoUrl = url + 'todo',
    wikiUrl = url + 'wiki',
    wikiCommentsUrl = url +'wikicomments';

module.exports = {
    url: url,
    chatUrl: chatUrl,
    todoUrl: todoUrl,
    wikiCommentsUrl: wikiCommentsUrl,
    wikiUrl: wikiUrl,
    groupsUrl: groupsUrl,
    LOGIN_URL: LOGIN_URL,
    REGISTER_URL: REGISTER_URL
};
