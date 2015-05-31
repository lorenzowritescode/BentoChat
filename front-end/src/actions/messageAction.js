/**
 * Created by evenoli on 26/05/2015.
 */
'use strict';

var Dispatcher = require('../dispatcher/WebappAppDispatcher'),
    ChatConstants = require('../constants/ChatActionConstants'),
    ChatUtils = require('../utils/ChatUtils'),
    Message = ChatUtils.Message,
    APIUtils = require('../utils/APIUtils'),
    chatUrl = require('../constants/APIConstants').chatUrl,
    io = require('socket.io-client')("http://localhost:3000");


var ActionTypes = ChatConstants.ActionTypes;

//Action for creating a new message
function createMessage (text) {
    var message = new ChatUtils.buildMessage (text);
    io.emit('post_message', message);
}

io.on('new_message', function (raw_msg) {
    Dispatcher.dispatch({
        type: ActionTypes.NEW_MESSAGE,
        message : new Message(raw_msg)
    });
});

function fetchMessages() {
    APIUtils.get(chatUrl, function (result) {

        var formatted_messages = result.map(function (raw_msg) {
            return new Message(raw_msg);
        });

        Dispatcher.dispatch({
            type: ActionTypes.FETCH_MESSAGES,
            message_list: formatted_messages
        });
    });
}

module.exports = {
    createMessage: createMessage,
    fetchMessages: fetchMessages
};

