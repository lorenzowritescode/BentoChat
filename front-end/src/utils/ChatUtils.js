/**
 * Created by evenoli on 27/05/2015.
 */
'use strict';
import LoginStore from '../stores/LoginStore';

function Message(raw_msg) {
    return {
        body: raw_msg.body,
        author: raw_msg.author,
        timestamp: new Date(raw_msg.timestamp),
        id: raw_msg.id
    };
}

Message.prototype.getText = function () {
    return this.text;
};

function buildMessage (text) {
    return new Message({
        body: text,
        author: LoginStore.user.username,
        timestamp: Date.now()
    });
}

module.exports = {
    Message: Message,
    buildMessage: buildMessage
};
