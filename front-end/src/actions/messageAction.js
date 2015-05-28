/**
 * Created by evenoli on 26/05/2015.
 */
'use strict';

var Dispatcher = require('../dispatcher/WebappAppDispatcher'),
    ChatConstants = require('../constants/ChatActionConstants'),
    ChatStore = require('../stores/ChatMessageStore'),
    ChatUtils = require('../utils/ChatUtils');


var ActionTypes = ChatConstants.ActionTypes;

//Action for creating a new message
function createMessage (text) {
    Dispatcher.dispatch({
        //Type describes the kind of job the dispatcher should do
        type: ActionTypes.CREATE_MESSAGE,
        text: text
    });
    var message = new ChatUtils.Message (text);
    //Send message to db here maybe?
}

module.exports = {
    createMessage: createMessage
};

