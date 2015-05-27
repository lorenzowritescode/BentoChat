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

var messages = {};
var exampleMessage = {id:1,
    authorName: "Professer Mgonigololol",
    text: "Five points to my ASS!!!"};
messages[0] = exampleMessage;


    function addMessage(message) {
    console.log("Message added to store with text");
    messages[message.id] = message;
    console.log(messages.length+ "messages now in store");
}

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

    getAll: function() {
        console.log( messages.length + " Messages returned from store!");
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

