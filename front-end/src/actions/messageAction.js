/**
 * Created by evenoli on 26/05/2015.
 */
'use strict';

var Dispatcher = require('../dispatcher/WebappAppDispatcher'),
    ChatConstants = require('../constants/ChatActionConstants'),
    ChatStore = require('../stores/ChatMessageStore'),
    ChatUtils = require('../utils/ChatUtils'),
    APIUtils = require('../utils/APIUtils'),
    chatUrl = require('../constants/APIConstants').chatUrl;


var ActionTypes = ChatConstants.ActionTypes;

//Action for creating a new message
function createMessage (text) {
    Dispatcher.dispatch({
        //Type describes the kind of job the dispatcher should do
        type: ActionTypes.CREATE_MESSAGE,
        text: text
    });
    var message = new ChatUtils.Message (text);

    APIUtils.post(chatUrl, message, function (success) {
        console.log(success);
    });
}

module.exports = {
    createMessage: createMessage
};

