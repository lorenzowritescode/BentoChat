'use strict';

var React = require('react/addons'),
    WikiActions = require('../actions/WikiAction'),
    PostStore = require('../stores/WikiPostStore'),
    Marked = require('marked');


require('styles/WikiViewer.sass');

function getStateFromStores() {
    return {
        posts: PostStore.getAll()
    };
}

function trim (text) {
    if (text.length > 200) {
        return (
        text.substring(0, 200) + '...'
        );
    } else {
        return(text);
    }
}

var PostListBody = React.createClass({
    render : function () {
        return (
            <div ref="wiki-list" className="body" dangerouslySetInnerHTML={{__html: this.props.body}}>
            </div>
        );
    }
});

var PostListItem = React.createClass({

    render: function () {
        var post = this.props.post;
        var body = Marked(trim(post.body));
        return (
            <div>
                <h3 className="title">{post.title}</h3>
                <sub> written by {post.author} at {post.timeStamp}</sub>
                <PostListBody body={body} />
            </div>);
    }
});

function getPost(post) {
    return (
        <PostListItem
            key={post.id}
            post={post}
        />
    );
}

var WikiViewer = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        PostStore.addChangeListener(this._onChange);
        WikiActions.fetchPosts();
    },

    componentWillUnmount: function() {
        PostStore.removeChangeListener(this._onChange);
    },

    render: function () {
        var PostList = this.state.posts.map(getPost);
        return (
            <div className="postList">
            {PostList}
            </div>
        );
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    }
});

module.exports = WikiViewer;

