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

var PostListItem = React.createClass({

    render: function () {
        var body = Marked(this._trim(this.props.body));
        return (<div>
            <h3 className="title">{this.props.title}</h3>
            <sub> written by {this.props.author} at {this.props.timeStamp}</sub>
                <div className="body" dangerouslySetInnerHTML={{__html: body}}>
                </div>
            </div>);
    },

    _trim: function (text) {
        if (text.length > 200) {
            return (
                text.substring(0, 200) + '...'
            );
        } else {
            return(text);
        }
    }
});

function getPost(post) {
    return (
        <PostListItem
            key={post.id}
            title={post.title}
            author={post.author}
            body={post.body}
            timeStamp={post.timeStamp}
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

