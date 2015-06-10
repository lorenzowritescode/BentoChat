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
        timestamp: Date.now()
    };
}

function markdownPost(post) {
    var title = post.title;
    var body = marked(post.body);
    return (
        <div className="wiki-post">
            <h2>{title}</h2>
            <sub> written by {post.author} at {post.timestamp}</sub>
            <p dangerouslySetInnerHTML={{__html: body}}></p>
        </div>
    );
}

function Comment(body, postid) {
    return {
        body: body,
        author: "Dave",
        postid: postid,
        timestamp: Date.now()
    };
}

var WikiTimestamp = React.createClass({
    render: function () {
        var d = new Date(this.props.timestamp);
        console.log("Timestamp! "+this.props.timestamp);
        var mins = d.getMinutes();
        mins = mins > 9 ? mins : '0' + mins;
        var hours = d.getHours();
        hours = hours > 9 ? hours : '0' + hours;
        var days = d.getDate();
        days = days > 9 ? days : '0' + days;
        var month = d.getMonth() + 1; //+1 as Jan is 0
        month = month > 9 ? month : '0' + month;
        var year = d.getFullYear();
        return (
            <div className="wiki-timestamp">
                {hours}:{mins} on {days}/{month}/{year}
            </div>
        );
    }
});

module.exports = {
    Post: Post,
    markdownPost: markdownPost,
    Comment: Comment,
    WikiTimestamp: WikiTimestamp
};
