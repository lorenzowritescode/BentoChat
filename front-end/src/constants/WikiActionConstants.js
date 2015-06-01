/**
 * Created by evenoli on 28/05/2015.
 */

var keyMirror = require('keymirror');

module.exports = {
    ActionTypes: keyMirror ({
        CREATE_POST: null,
        DELETE_POST: null,
        FETCH_POSTS: null
    })
};
