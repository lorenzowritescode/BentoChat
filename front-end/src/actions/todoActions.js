/**
 * Created by sambudd on 28/05/2015.
 */
'use strict';

var Dispatcher = require('../dispatcher/WebappAppDispatcher'),
    TodoConstants = require('../constants/TodoActionConstants'),
    TodoStore = require('../stores/TodoStore'),
    TodoUtils = require('../utils/TodoUtils');

var ActionTypes = TodoConstants.ActionTypes;

function createTodo (author, text) {
    Dispatcher.dispatch({
        type: ActionTypes.CREATE_TODO,
        author: author,
        text: text
    });

}

module.exports = {
    createTodo: createTodo
};
