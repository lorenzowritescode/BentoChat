/**
 * Created by evenoli on 10/06/15.
 */
'use strict';

function Comment(body, postid) {
    return {
        body: body,
        author: "Dave",
        postid: postid,
        timestamp: Date.now()
    };
}

module.exports = {
    Comment: Comment
};
