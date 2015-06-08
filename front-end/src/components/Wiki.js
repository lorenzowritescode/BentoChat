'use strict';

var React = require('react/addons');
var marked = require('marked');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link,
    Navigation = require('react-router').Navigation,
    WikiAction = require('../actions/WikiAction'),
    PostStore = require('../stores/WikiPostStore'),
    Marked = require('marked');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

require('styles/Wiki.sass');

function trim (text) {
    if (text.length > 200) {
        return (
            text.substring(0, 200) + '...'
        );
    } else {
        return(text);
    }
}

var PostListItem = React.createClass({
    mixins: [Navigation],

    handleClick: function () {
        this.transitionTo("wiki-view", {wikiid: this.props.post.id});
    },

    render: function () {
        var post = this.props.post;
        var body = Marked(trim(post.body));
        return (
            <div className="wiki-list-item" onClick={this.handleClick}>
                <div className="title">{post.title}</div>
                <div className="info" > written by {post.author} at {post.timestamp}</div>
                <div className="body" dangerouslySetInnerHTML={{__html: body}}>
                </div>
            </div>);
    }
});

var WikiListViewer = React.createClass({

    getInitialState: function() {
        return this.getState();
    },

    componentDidMount: function() {
        PostStore.addChangeListener(this._onChange);
        WikiAction.fetchPosts();
    },

    componentWillUnmount: function() {
        PostStore.removeChangeListener(this._onChange);
    },

    render: function () {
        var posts = this.state.posts.map(
            (post) => {
                return (
                    <PostListItem
                        key={post.id}
                        post={post}
                        />);
            }
        );

        return (
            <div className="post-list">
                {posts}
            </div>
        );
    },

    getState: function () {
        return {
            posts: PostStore.getAll()
        };
    },

    _onChange: function() {
        this.setState(this.getState());
    }
});


var Wiki = React.createClass({

    render: function () {
        return (
            <div className="wiki-body">
                <div className="wiki-content">
                    <RouteHandler />
                </div>
                <div className="wiki-nav">
                    <Link to="wiki-new" className="btn btn-info btn-block" activeClassName="disabled">
                            New
                    </Link>
                </div>
                <div className="wiki-side">
                    History info baby
                </div>
            </div>
        );
    }
});

module.exports = {
    Wiki: Wiki,
    WikiListView: WikiListViewer
};

