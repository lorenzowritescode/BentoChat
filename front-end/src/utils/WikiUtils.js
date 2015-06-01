/**
 * Created by evenoli on 28/05/2015.
 */
'use strict';

var marked = require('marked'),
    React = require('react/addons');

function Post(title, text) {
    return {
        title: title,
        body: text,
        author: "Madame Hooch",
        timeStamp: Date.now(),
        id: Date.now()
    };
}

function markdownPost(post) {
    var title = post.title;
    var body = marked(post.body);
    return (
        <div className="wiki-post">
            <h2>{title}</h2>
            <sub> written by {post.author} at {post.timeStamp}</sub>
            <p dangerouslySetInnerHTML={{__html: body}}></p>
        </div>
    );
}


module.exports = {
    Post: Post,
    markdownPost: markdownPost
};
