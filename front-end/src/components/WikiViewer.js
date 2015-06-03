'use strict';

var React = require('react/addons'),
    WikiAction = require('../actions/WikiAction'),
    PostStore = require('../stores/WikiPostStore'),
    Marked = require('marked');


require('styles/WikiViewer.sass');

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
                <p> written by {post.author} at {post.timestamp}</p>
                <PostListBody body={body} />
            </div>);
    }
});

var WikiViewer = React.createClass({

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
            return (<PostListItem
                key={post.id}
                post={post}
                />)
            }
        );

        return (
            <div className="postList">
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

module.exports = WikiViewer;

