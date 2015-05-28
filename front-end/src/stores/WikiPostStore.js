/**
 * Created by evenoli on 28/05/2015.
 */
'use strict';

var AppDispatcher = require('../dispatcher/WebappAppDispatcher'),
    WikiConstants = require('../constants/WikiActionConstants'),
    WikiUtils = require('../utils/WikiUtils'),
    merge = require('react/lib/merge'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign');

var ActionTypes = WikiConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var posts = [];

function addPost (post) {
    console.log("adding post to store");
    posts.push(post);
}

var PostStore = assign({}, EventEmitter.prototype, {

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
        for (var pst in posts) {
            if (pst.id === id) {
                return pst;
            }
        }

        return null;
    },

    getAll: function() {
        return posts;
    }
});

PostStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.CREATE_POST:
            var post = new WikiUtils.Post(action.body);
            addPost(post);
            PostStore.emitChange();
            break;
    }
});

module.exports = PostStore;