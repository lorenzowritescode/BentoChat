'use strict';

var React = require('react/addons'),
    WikiAction = require('../actions/WikiAction'),
    PostStore = require('../stores/WikiPostStore'),
    Marked = require('marked'),
    RouteHandler = require('react-router').RouteHandler,
    Link = require('react-router').Link,
    Navigation = require('react-router').Navigation,
    CommentSection = require('../components/Comments').CommentSection,
    BentoComment = require('../components/Comments').BentoComment;

require('styles/WikiViewer.sass');

var WikiViewer = React.createClass({
    mixins: [Navigation],

    getInitialState: function () {
        return ({
            warningOpen: false
        });
    },

    toggleWarning: function () {
        this.setState({
            warningOpen: !this.state.warningOpen
        });
    },

    onReturn: function () {
        this.transitionTo("wiki");
    },

    onDelete: function () {
        WikiAction.deletePost(this.props.params.wikiid);
        this.transitionTo("wiki");

    },

    onEdit: function () {
        this.transitionTo("wiki-new", null, {postId: this.props.params.wikiid});
    },

    render: function () {
        var post = PostStore.get(this.props.params.wikiid);
        var body = Marked(post.body);
        var date = new Date(parseInt(post.timestamp)).toDateString();
        return (
            <div className="wiki-view">
                <button className="btn btn-warning btn-block delete-button"
                        onClick={this.toggleWarning}>
                    <span className="glyphicon glyphicon-trash"></span>
                </button>

                <button className="btn btn-warning btn-block edit-button"
                        onClick={this.onEdit}>
                    <span className="glyphicon glyphicon-pencil"></span>
                </button>

                <button className="btn btn-default btn-block back-button"
                        onClick={this.onReturn}>
                    <span className="glyphicon glyphicon-arrow-left"></span>
                </button>

                <div className="wiki-single-item">
                    <div className="title">{post.title}</div>
                    <div className="info" > written by {post.author} at {date}
                    </div>
                    <div className="body" dangerouslySetInnerHTML={{__html: body}}>
                    </div>
                </div>
                <div className={this.state.warningOpen ? "alert alert-danger warning-open"
                                                        : "alert alert-danger warning-closed"} >
                    Are you super sure you want to delete this post?
                    <button className="btn btn-warning del-yes" onClick={this.onDelete}>
                        <span className="glyphicon glyphicon-ok"></span>
                    </button>
                    <button className="btn btn-warning del-no" onClick={this.toggleWarning}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                </div>
                <CommentSection itemid={post.id} />
            </div>);
    },

});



module.exports = WikiViewer;


