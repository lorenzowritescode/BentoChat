/**
 * Created by evenoli on 28/05/2015.
 */
'use strict';
import LoginStore from '../stores/LoginStore';

var marked = require('marked'),
    React = require('react/addons');

function Post(title, text) {
    return {
        author: LoginStore.user.username,
        title: title,
        body: text,
        timestamp: Date.now()
    };
}

function markdownPost(post) {
    var title = post.title;
    var body = marked(post.body);
    var date = new Date(parseInt(post.timestamp)).toDateString();
    return (
        <div className="wiki-post">
            <h2>{title}</h2>
            <sub> written by {post.author} on {date}</sub>
            <p dangerouslySetInnerHTML={{__html: body}}></p>
        </div>
    );
}

module.exports = {
    Post: Post,
    markdownPost: markdownPost,
    Comment: Comment
};
