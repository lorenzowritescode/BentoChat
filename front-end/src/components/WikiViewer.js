'use strict';

var React = require('react/addons'),
    WikiAction = require('../actions/WikiAction'),
    PostStore = require('../stores/WikiPostStore'),
    Marked = require('marked'),
    RouteHandler = require('react-router').RouteHandler,
    Link = require('react-router').Link,
    Navigation = require('react-router').Navigation,
    WikiTimestamp = require('../utils/WikiUtils').WikiTimestamp,
    CommentSection = require('../components/Comments').CommentSection,
    BentoComment = require('../components/Comments').BentoComment;

require('styles/WikiViewer.sass');

var WikiViewer = React.createClass({
    mixins: [Navigation],

    onReturn: function () {
        this.transitionTo("wiki");
    },

    onDelete: function () {
        if (window.confirm("Are you sure you want to delete this post?")){
            WikiAction.deletePost(this.props.params.wikiid);
            this.transitionTo("wiki");
        }
    },

    render: function () {
        var post = PostStore.get(this.props.params.wikiid);
        var body = Marked(post.body);
        return (
            <div className="wiki-view">
                <button className="btn btn-warning btn-block delete-button"
                        onClick={this.onDelete}>
                    <span className="glyphicon glyphicon-trash"></span>
                </button>

                <button className="btn btn-info btn-block back-button"
                        onClick={this.onReturn}>
                    <span className="glyphicon glyphicon-arrow-left"></span>
                </button>

                <div className="wiki-single-item">
                    <div className="title">{post.title}</div>
                    <div className="info" > written by {post.author} at
                        <WikiTimestamp timestamp={post.timestamp} />
                    </div>
                    <div className="body" dangerouslySetInnerHTML={{__html: body}}>
                    </div>
                </div>
                <CommentSection itemid={post.id} />
            </div>);
    },

});



module.exports = WikiViewer;


