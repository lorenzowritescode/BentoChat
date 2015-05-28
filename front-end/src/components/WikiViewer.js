'use strict';

var React = require('react/addons'),
    WikiActions = require('../actions/WikiAction'),
    PostStore = require('../stores/WikiPostStore');


require('styles/WikiViewer.sass');

function getStateFromStores() {
    return {
        posts: PostStore.getAll()
    };
}

var Post = React.createClass({
    render: function () {
        return (<div>
            <b>{this.props.author}</b>
                <div>
                    {this.props.body}
                </div>
            </div>);
    }
});

function getPost(post) {
    return (
        <Post
            key={post.id}
            author={post.author}
            body={post.body}
            />
    );
}

var WikiViewer = React.createClass({

  getInitialState: function() {
      return getStateFromStores();
  },

    componentDidMount: function() {
        PostStore.addChangeListener(this._onChange);
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

