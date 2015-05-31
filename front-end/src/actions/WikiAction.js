/**
 * Created by evenoli on 28/05/2015.
 */
'use strict';

var Dispatcher = require('../dispatcher/WebappAppDispatcher'),
    WikiConstants = require('../constants/WikiActionConstants');

var ActionTypes = WikiConstants.ActionTypes;

function createPost(title, text) {
    Dispatcher.dispatch({
        type: ActionTypes.CREATE_POST,
        title: title,
        body: text
    });
}

module.exports = {
    createPost: createPost
};
