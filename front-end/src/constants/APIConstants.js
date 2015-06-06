var host = 'localhost',
    port = '3000',
    url = 'http://'+ host + ':' + port + '/',
    chatUrl = url + 'chat',
    todoUrl = url + 'todo',
    wikiUrl = url + 'wiki',
    wikiCommentsUrl = url +'wikicomments';

module.exports = {
    url: url,
    chatUrl: chatUrl,
    todoUrl: todoUrl,
    wikiUrl: wikiUrl,
    wikiCommentsUrl: wikiCommentsUrl
};
