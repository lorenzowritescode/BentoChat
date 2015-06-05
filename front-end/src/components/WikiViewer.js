'use strict';

var React = require('react/addons'),
    WikiAction = require('../actions/WikiAction'),
    PostStore = require('../stores/WikiPostStore'),
    Marked = require('marked'),
    RouteHandler = require('react-router').RouteHandler,
    Link = require('react-router').Link,
    Navigation = require('react-router').Navigation;


require('styles/WikiViewer.sass');

var WikiViewer = React.createClass({
    mixins: [Navigation],

    onReturn: function () {
        this.transitionTo("wiki");
    },

    render: function () {
        var post = PostStore.get(this.props.params.wikiid);
        var body = Marked(post.body);
        return (
            <div className="wiki-single-item">
                <div className="title">{post.title}</div>
                <div className="info" > written by {post.author} at {post.timestamp}</div>
                <div className="body" dangerouslySetInnerHTML={{__html: body}}>
                </div>
                <button onClick={this.onReturn}>Back</button>
            </div>);
    }
});

module.exports = WikiViewer;


