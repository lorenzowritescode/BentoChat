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
var CHANGE_EVENT = 'change';

var todos = [];

function addTodo(todo) {
    todos.push(todo);
}

function toggleTodo(id) {
    for (var tod in todos) {
        if (tod.id === id) {
            if (tod.status === "pending") {
                tod.status = "complete";
            } else if (tod.status === "completed") {
                tod.status = "pending";
            }
        }
    }
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

   getAllTodos: function() {
       return todos;
   },

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
