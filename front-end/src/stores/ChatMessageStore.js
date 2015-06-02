/**
 * Created by evenoli on 27/05/2015.
 */
'use strict';


var AppDispatcher = require('../dispatcher/WebappAppDispatcher'),
    ChatConstants = require('../constants/ChatActionConstants'),
    ChatUtils = require('../utils/ChatUtils'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    React = require('react/addons');



var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

//Collection of messages (effectively, the actual store)
var messages = [];

//Adds a message to the store
function addMessage(message) {
    messages.push(message);
}

//Adds a message to the store
function setMessages(new_messages) {
    messages = new_messages;
}

// Not entirely sure what's up with the assign, apparently it's a ponyfill. (ponies yay)
// Ponyfill: A polyfill that doesn't overwrite the native method. Need to look at this more.
// EventEmitter is to do with listeners and callbacks. Recommend looking up.
var MessageStore = assign({}, EventEmitter.prototype, {

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    get: function(id) {
        for (var msg in messages) {
            if (msg.id === id) {
                return msg;
            }
        }

        return null;
    },

    //Put messages into array so map function in 'Chat.js' works
    getAll: function() {
        return messages;
    }
});


MessageStore.dispatchToken = AppDispatcher.register(function(action) {
    switch(action.type) {

        case ActionTypes.NEW_MESSAGE:
            addMessage(action.message);
            MessageStore.emitChange();
            break;
        case ActionTypes.FETCH_MESSAGES:
            setMessages(action.message_list);
            MessageStore.emitChange();
            break;
    }

});

module.exports = MessageStore;

