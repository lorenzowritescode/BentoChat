/**
 * Created by evenoli on 06/06/2015.
 */
'use strict';

var Dispatcher = require('../dispatcher/WebappAppDispatcher'),
    ActionTypes = require('../constants/ActionConstants'),
    WikiUtils = require('../utils/WikiUtils'),
    CommentUtils = require('../utils/CommentUtils'),
    APIUtils = require('../utils/APIUtils'),
    ComUrl = require('../constants/APIConstants').wikiCommentsUrl;

function createComment(body, itemid) {
    var comment = CommentUtils.Comment(body, itemid);
    APIUtils.post(ComUrl, comment, function (new_id) {
        comment.id = new_id;
        Dispatcher.dispatch({
            type: ActionTypes.CREATE_COMMENT,
            comment: comment
        });
    });
    console.log("Created comment with postid "+comment.postid+ " and real id " + comment.id);
}

function fetchComment () {
    APIUtils.get(ComUrl, function (result) {
        Dispatcher.dispatch({
            type: ActionTypes.FETCH_COMMENTS,
            comment_list: result
        });
    });
}

module.exports = {
    createComment: createComment,
    fetchComments: fetchComment
};
