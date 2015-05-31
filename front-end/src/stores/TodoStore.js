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
var completed = [];

var exampleTodo = {
    id:1,
    author: "Simba",
    text: "Take back the Kingdom",
    completed: false
};

var exampleCompletedTodo = {
    id:1,
    author: "Scar",
    text: "Kill Mufasa",
    completed: true
};

todos.push(exampleTodo);
completed.push(exampleCompletedTodo);

function addTodo(todo) {
    todos.push(todo);
}

function addToCompleted(todo) {
    todos.remove(todo);
    completed.push(todo);
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

   getTodo: function(id) {
       for (var td in todos) {
           if (td.id === id) {
               return td;
           }
       }
       return null;
   },

   getCompletedTodo: function(id) {
       for (var td in completed) {
           if (td.id === id) {
               return td;
           }
       }
       return null;
   },

   getAllTodos: function() {
       return todos;
   },

   getAllCompleted: function() {
       return completed;
   }

});

TodoStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.CREATE_TODO:
            var todo = new TodoUtils.Todo(action.author, action.text);
            addTodo(todo);
            TodoStore.emitChange();
            break;

        case ActionTypes.COMPLETE_TODO:

    }
});

module.exports = TodoStore;
