/**
 * Created by evenoli on 27/05/2015.
 */
'use strict';

module.exports = {

    getCreatedMessageData: function(text) {
        return {
            id: 'm_' + Date.now(),
            authorName: 'Dumbledor',
            text: text
        };
    },

    convertRawMessage: function(rawMessage) {
        return {
            id: 'm_' + Date.now(),
            authorName: 'Dumbledor',
            text: rawMessage.text
        };
    }
};
