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

function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}

module.exports = {
    Message: Message,
    buildMessage: buildMessage,
    linkify: linkify
};
