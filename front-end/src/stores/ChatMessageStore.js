/**
 * Created by evenoli on 27/05/2015.
 */
'use strict';


var AppDispatcher = require('../dispatcher/WebappAppDispatcher'),
    ChatConstants = require('../constants/ChatActionConstants'),
    ChatUtils = require('../utils/ChatUtils'),
    merge = require('react/lib/merge'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign');



var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

//Collection of messages (effectively, the actual store)
var messages = {};


var exampleMessage = {id:1,
    authorName: "Professer Mgonigololol",
    text: "Five points to my ASS!!!"};
messages[0] = exampleMessage;

//Adds a message to the store
function addMessage(message) {
    messages[message.id] = message;
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
        return messages[id];
    },

    //Put messages into array so map function in 'Chat.js' works
    getAll: function() {
        var retArray = [];
        for (var id in messages) {
            retArray.push(messages[id]);
        }
        return retArray;
    }
});

MessageStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.CREATE_MESSAGE:
            var message = ChatUtils.getCreatedMessageData(
                action.text
            );
            addMessage(message);
            MessageStore.emitChange();
            break;
    }

});

module.exports = MessageStore;

