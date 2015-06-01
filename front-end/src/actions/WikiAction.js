/**
 * Created by evenoli on 28/05/2015.
 */
'use strict';

var Dispatcher = require('../dispatcher/WebappAppDispatcher'),
    WikiConstants = require('../constants/WikiActionConstants'),
    io = require('socket.io-client')("http://localhost:3000"),
    WikiUtils = require('../utils/WikiUtils');

var ActionTypes = WikiConstants.ActionTypes;

function createPost(title, text) {
    Dispatcher.dispatch({
        type: ActionTypes.CREATE_POST,
        title: title,
        body: text
    });
    var post = WikiUtils.Post(title, text);
}

module.exports = {
    createPost: createPost
};
