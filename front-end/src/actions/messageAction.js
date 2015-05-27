/**
 * Created by evenoli on 26/05/2015.
 */
'use strict';

var Dispatcher = require('../dispatcher/WebappAppDispatcher'),
    ChatConstants = require('../constants/ChatActionConstants'),
    ChatStore = require('../stores/ChatMessageStore'),
    ChatUtils = require('../utils/ChatUtils');


var ActionTypes = ChatConstants.ActionTypes;

function createMessage (text) {
    Dispatcher.dispatch({
        type: ActionTypes.CREATE_MESSAGE,
        text: text
    });
    var message = ChatUtils.getCreatedMessageData(text);
    //ChatStore.addMessage(message);
}

module.exports = {
    createMessage: createMessage
};

