/**
 * Created by evenoli on 10/06/15.
 */
'use strict';

import LoginStore from '../stores/LoginStore';

function Comment(body, postid) {
    return {
        body: body,
        author: LoginStore.user.username,
        postid: postid,
        timestamp: Date.now()
    };
}

module.exports = {
    Comment: Comment
};
