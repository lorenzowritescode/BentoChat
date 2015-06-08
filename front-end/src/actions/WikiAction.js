/**
 * Created by evenoli on 28/05/2015.
 */
'use strict';

var Dispatcher = require('../dispatcher/WebappAppDispatcher'),
    ActionTypes = require('../constants/ActionConstants'),
    WikiUtils = require('../utils/WikiUtils'),
    APIUtils = require('../utils/APIUtils'),
    wikiUrl = require('../constants/APIConstants').wikiUrl;

function createPost(title, text) {
    var post = WikiUtils.Post(title, text);
    APIUtils.post(wikiUrl, post, function (new_id) {
        post.id = new_id;
        Dispatcher.dispatch({
            type: ActionTypes.CREATE_POST,
            post: post
        });
    });
}

function fetchPosts () {
    APIUtils.get(wikiUrl, function (result) {
        Dispatcher.dispatch({
            type: ActionTypes.FETCH_POSTS,
            post_list: result
        });
    });
}

module.exports = {
    createPost: createPost,
    fetchPosts: fetchPosts
};
