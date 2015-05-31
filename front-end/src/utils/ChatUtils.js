/**
 * Created by evenoli on 27/05/2015.
 */
'use strict';

function Message(raw_msg) {
    return {
        body: raw_msg.body,
        author: raw_msg.author,
        timestamp: new Date(raw_msg.timestamp)
    };
}

Message.prototype.getText = function () {
    return this.text;
};

function buildMessage (text) {
    return new Message({
        body: text,
        author: "Dumbledore",
        timestamp: Date.now()
    });
}

module.exports = {
    Message: Message,
    buildMessage: buildMessage
};
