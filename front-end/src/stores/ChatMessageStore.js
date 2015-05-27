/**
 * Created by evenoli on 27/05/2015.
 */

var AppDispatcher = require('../dispatcher/WebappAppDispatcher');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var messages = {};

function addMessage(message) {
    messages[message.id] = message;
}

var MessageStore = React.createClass({

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    get: function(id) {
        return messages[id];
    },

    getAll: function() {
        return messages;
    }
});

module.exports = MessageStore;
