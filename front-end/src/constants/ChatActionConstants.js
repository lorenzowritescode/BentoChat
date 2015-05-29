/**
 * Created by evenoli on 27/05/2015.
**/
var keyMirror = require('keymirror');

module.exports = {
    ActionTypes: keyMirror ({
        CREATE_MESSAGE: null,
        RECEIVE_RAW_CREATED_MESSAGE: null,
        RECEIVE_RAW_MESSAGES: null,
        FETCH_MESSAGES: null
    })
};
