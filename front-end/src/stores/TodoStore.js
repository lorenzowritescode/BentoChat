/**
 * Created by sambudd on 28/05/2015.
 */
'use strict';

var AppDispatcher = require('../dispatcher/WebappAppDispatcher'),
    TodoConstants = require('../constants/TodoActionConstants'),
    TodoUtils = require('../utils/TodoUtils'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign');

var ActionTypes = TodoConstants.ActionTypes;
const CHANGE_EVENT = 'change',
    PENDING_TODO = 'pending',
    COMPLETED_TODO = 'completed';

var todos = [];

function addTodo(todo) {
    todos.push(todo);
}

function toggleTodo(id) {
    todos.forEach(function (todo) {
        if (todo.id === id) {
            if (todo.status === PENDING_TODO)
                todo.status = COMPLETED_TODO;
            else if (todo.status === COMPLETED_TODO)
                todo.status = PENDING_TODO;
        }
    });
}

var TodoStore = assign({}, EventEmitter.prototype, {

   emitChange: function () {
       this.emit(CHANGE_EVENT);
   },

   addChangeListener: function(callback) {
       this.on(CHANGE_EVENT, callback);
   },

   removeChangeListener: function(callback) {
       this.removeListener(CHANGE_EVENT, callback);
   },

   getCompleted: function () {
       return todos.filter(function (todo) {
           return todo.status === 'completed';
       });
   },

    getPending: function () {
        return todos.filter(function (todo) {
            return todo.status === 'pending';
        });
    }
});

TodoStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.CREATE_TODO:
            addTodo(action.todo);
            TodoStore.emitChange();
            break;

        case ActionTypes.FETCH_TODOS:
            todos = action.todo_list;
            TodoStore.emitChange();
            break;

        case ActionTypes.COMPLETE_TODO:
            toggleTodo(action.id);
            TodoStore.emitChange();
            break;

    }
});

module.exports = TodoStore;
