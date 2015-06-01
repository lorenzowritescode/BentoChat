/**
 * Created by sambudd on 28/05/2015.
 */
'use strict';

var Dispatcher = require('../dispatcher/WebappAppDispatcher'),
    TodoConstants = require('../constants/TodoActionConstants'),
    TodoStore = require('../stores/TodoStore'),
    TodoUtils = require('../utils/TodoUtils'),
    Todo = TodoUtils.Todo,
    APIUtils = require('../utils/APIUtils'),
    todoUrl = require('../constants/APIConstants').todoUrl;

var ActionTypes = TodoConstants.ActionTypes;

function createTodo (todo) {
    APIUtils.post(todoUrl, todo, function (new_id) {
        todo.id = new_id;
        Dispatcher.dispatch({
            type: ActionTypes.CREATE_TODO,
            todo: todo
        });
    });
}

function fetchTodos () {
    APIUtils.get(todoUrl, function (result) {
        Dispatcher.dispatch({
            type: ActionTypes.FETCH_TODOS,
            todo_list: result
        });
    });
}

function toggleTodo(id) {
    function callback (response) {
        Dispatcher.dispatch({
            type: ActionTypes.COMPLETE_TODO,
            id: id
        });
    }
    APIUtils.put(todoUrl, {id: id}, callback);
}

module.exports = {
    createTodo: createTodo,
    fetchTodos: fetchTodos,
    toggleTodo: toggleTodo
};
