/**
 * Created by evenoli on 26/05/2015.
 */
'use strict';

var Dispatcher = require('../dispatcher/WebappAppDispatcher'),
    ActionTypes = require('../constants/ActionConstants'),
    ChatUtils = require('../utils/ChatUtils'),
    Message = ChatUtils.Message,
    APIUtils = require('../utils/APIUtils'),
    chatUrl = require('../constants/APIConstants').chatUrl,
    groupsUrl = require('../constants/APIConstants').groupsUrl,
    apiUrl = require('../constants/APIConstants').url,
    socket = require('socket.io-client')(apiUrl),
    LoginStore = require('../stores/LoginStore');

//Action for creating a new message
function createMessage (text) {
    var message = new ChatUtils.buildMessage (text);
    socket.emit('post_message', message);
}

socket.on('connect', function () {
    socket.on('authenticated', function () {
        console.log('Socket.io has established an authenticated connection.');
        socket.emit('i_am_online');

        socket.on('new_message', function (raw_msg) {
            Dispatcher.dispatch({
                type: ActionTypes.NEW_MESSAGE,
                message : new Message(raw_msg)
            });
        });

        socket.on('user_online', function (data) {
            Dispatcher.dispatch({
                type: ActionTypes.USER_ONLINE,
                username: data.username,
                groupName: data.group_name
            });
        });
    }).emit('authenticate', {
        token: LoginStore.jwt
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

function fetchGroups () {
    APIUtils.get(groupsUrl, function (groups) {
        Dispatcher.dispatch({
            type: ActionTypes.FETCH_GROUPS,
            groups: {
                'test-group': groups
            }
        });
    });
}

function changeGroup (new_selection) {
    Dispatcher.dispatch({
        type: ActionTypes.CHANGE_GROUP,
        groupName: new_selection
    });
}

module.exports = {
    createMessage: createMessage,
    fetchMessages: fetchMessages,
    fetchGroups: fetchGroups,
    changeGroup: changeGroup
};

