/**
 * Created by evenoli on 28/05/2015.
 */
'use strict';
import LoginStore from '../stores/LoginStore';

var marked = require('marked'),
    React = require('react/addons');

function Post(title, text) {
    return {
        author: LoginStore.user.author,
        title: title,
        body: text,
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
