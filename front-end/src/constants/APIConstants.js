var host = 'localhost',
    port = '3000',
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
