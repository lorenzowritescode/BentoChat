/**
 * Created by sambudd on 08/06/2015.
 */
var keyMirror = require('keymirror');

module.exports = {
    ActionTypes: keyMirror ({
        //Wiki
        CREATE_POST: null,
        DELETE_POST: null,
        FETCH_POSTS: null,
        CREATE_COMMENT: null,
        FETCH_COMMENTS: null,
        //Chat
        NEW_MESSAGE: null,
        FETCH_MESSAGES: null,
        //Todos
        CREATE_TODO: null,
        COMPLETE_TODO: null,
        FETCH_TODOS: null,
        ARCHIVE_TODO: null,
        //Auth
        LOGIN_USER: null,
        LOGOUT_USER: null
    })
};
