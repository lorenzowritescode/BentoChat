'use strict';

var React = require('react/addons'),
    WikiAction = require('../actions/WikiAction'),
    WikiCommentAction = require('../actions/WikiCommentAction'),
    PostStore = require('../stores/WikiPostStore'),
    CommentStore = require('../stores/WikiCommentStore'),
    Marked = require('marked'),
    RouteHandler = require('react-router').RouteHandler,
    Link = require('react-router').Link,
    Navigation = require('react-router').Navigation;


require('styles/WikiViewer.sass');

var WikiComment = React.createClass({

    render: function () {
        return (
            <div className="comment">
                <div className="author">
                   <b> {this.props.comment.author} </b>
                </div>
                <div className="body">
                    {this.props.comment.body}
                </div>
            </div>
        );
    }
});

var CommentSection = React.createClass({

    getInitialState: function () {
        return (
        {text: '',
        comments: CommentStore.getAllForPost(this.props.postid)}
        );
    },

    getState: function () {
        return {
            comments: CommentStore.getAllForPost(this.props.postid)
        };
    },

    onTextChange: function (event, value) {
        this.setState({text: event.target.value});
    },

    onComChange: function () {
        this.setState(this.getState);
    },

    componentDidMount: function () {
        CommentStore.addChangeListener(this.onComChange);
        WikiCommentAction.fetchComments();
    },

    componentWillUnmount: function () {
        CommentStore.removeChangeListener(this.onComChange);
    },

    send: function () {
        var text = this.state.text.trim();
        if(text) {
            WikiCommentAction.createComment(text, this.props.postid);
        }
        this.setState({text: ''});
    },

    render: function () {
        var commentlist = this.state.comments.map(
            (comment) => {
                return (
                    <WikiComment
                        key={comment.id}
                        comment={comment}
                        />);
            }
        );
        return (
            <div className="comment-section">
                <div className="comment-input-section">
                    <textarea className="comment-box"
                              placeholder="Leave a comment. If you want."
                              onChange={this.onTextChange}
                              value={this.state.text}/>
                    <button onClick={this.send} className="btn btn-success input-group-addon post-button">
                        <span className="glyphicon glyphicon-ok"></span>
                    </button>
                </div>
                <div className="comment-list" >
                    {commentlist}
                </div>
            </div>

        );
    }
});

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
                <button className="btn btn-info btn-block back-button"
                        onClick={this.onReturn}>
                    <span className="glyphicon glyphicon-arrow-left"></span>
                </button>
                <div className="wiki-single-item">
                    <div className="title">{post.title}</div>
                    <div className="info" > written by {post.author} at {post.timestamp}</div>
                    <div className="body" dangerouslySetInnerHTML={{__html: body}}>
                    </div>
                </div>
                <button className="btn btn-info btn-block delete-button"
                        onClick={this.onDelete}>
                    <span className="glyphicon glyphicon-trash"></span>
                </button>
                <CommentSection postid={post.id} />
            </div>);
    },

});



module.exports = WikiViewer;


