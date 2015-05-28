/**
 * Created by evenoli on 27/05/2015.
 */
'use strict';

function Message(text) {
    return {
        text: text,
        authorName: "Dumbledore",
        id: "m_" + Date.now()
    };
}

Message.prototype.getText = function () {
    return this.text;
};

module.exports = {
    Message: Message
};
