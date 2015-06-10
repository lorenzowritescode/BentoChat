/**
 * Created by evenoli on 06/06/2015.
 */
'use strict';

var AppDispatcher = require('../dispatcher/WebappAppDispatcher'),
    ActionTypes = require('../constants/ActionConstants'),
    WikiUtils = require('../utils/WikiUtils'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign');

var CHANGE_EVENT = 'change';

var comments = [];

function addComment (comment) {
    comments.push(comment);
}

function removeComments (postid) {
    for (var i in comments) {
        if (comments[i].postid === postid) {
            comments.splice(i, 1);
        }
    }
}

var CommentStore = assign({}, EventEmitter.prototype, {

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    get: function(id) {
        for (var i in comments) {
            if (comments[i].id === id) {
                return comments[i];
            }
        }
        return null;
    },

    getAll: function() {
        return comments;
    },

    getAllForPost: function(postid) {
        var res = [];
        for (var i in comments) {
            if (comments[i].postid === postid) {
                res.push(comments[i]);
            }
        }
        return res;
    }
});

CommentStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.CREATE_COMMENT:
            var comment = action.comment;
            addComment(comment);
            CommentStore.emitChange();
            break;

        case ActionTypes.FETCH_COMMENTS:
            comments = action.comment_list;
            CommentStore.emitChange();
            break;

        case ActionTypes.DELETE_POST:
            removeComments(action.postid);
            CommentStore.emitChange();
            break;
    }
});

module.exports = CommentStore;
