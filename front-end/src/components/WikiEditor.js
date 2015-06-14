'use strict';

var React = require('react/addons'),
    WikiActions = require('../actions/WikiAction'),
    WikiUtils = require('../utils/WikiUtils'),
    RouteHandler = require('react-router').RouteHandler,
    Link = require('react-router').Link,
    Navigation = require('react-router').Navigation,
    PostStore = require('../stores/WikiPostStore');


require('styles/WikiEditor.sass');

var Tabs = React.createClass({
    render: function(){
        return (
            <div className="editor-buttons" role="navigation">
                <ul className="nav nav-tabs wiki-tabs">
                    <li role="presentation"><Link to="wiki-edit">Edit</Link></li>
                    <li role="presentation"><Link to="wiki-preview">Preview</Link></li>
                </ul>
            </div>
        );
    }
});

var WikiEditor = React.createClass({
    mixins: [Navigation],

    getInitialState: function () {
        if (this.props.query.postId) {
            var post = PostStore.get(this.props.query.postId);
            console.log(post.body);
            return (
            {   text: post.body,
                title: post.title,
                preview: null,
                err: '',
                warningOpen: false,
                noticeOpen: false}
            );
        } else {
            return (
            {   text: '',
                title: '',
                preview: null,
                err: '',
                warningOpen: false,
                noticeOpen: false
            }
            );
        }
    },

    render: function () {

        return (
            <div className="full-size">
                <Tabs className="tabs" />
                <div className="buttons">
                    <div className="btn btn-success save-wiki" onClick={this.send}>
                        <span className="glyphicon glyphicon-ok"></span> Save
                    </div>
                    <div className="btn btn-warning cancel-wiki" onClick={this.onReturn}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </div>
                </div>

                <div className={this.state.noticeOpen ? "alert alert-warning edit-notice-open"
                                                        : "alert alert-warning edit-notice-closed"}>
                    {this.state.err}
                    <button className="btn btn-warning ok" onClick={this.toggleNotice}> OK </button>
                </div>
                <div className={this.state.warningOpen ? "alert alert-warning edit-warn-open"
                                                        : "alert alert-warning edit-warn-closed"}>
                    Are you sure you want to go back? Your great post will be lost!
                    <button className="btn btn-warning yes" onClick={this._return}>
                        <span className="glyphicon glyphicon-ok"></span>
                    </button>
                    <button className="btn btn-warning no" onClick={this.toggleWarning}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                </div>

                <RouteHandler {...{textChange: this._onChange,
                    titleChange: this._onTitleChange,
                    getTitle: this._getTitle,
                    getText: this._getText}}/>
            </div>
        );
    },

    _return: function () {
        this.transitionTo("wiki");
    },

    onReturn: function () {
        var text = this.state.text.trim();
        var title = this.state.title.trim();
        if(text || title) {
            this.toggleWarning();
        } else {
            this.transitionTo("wiki");
        }
    },

    send: function () {
        var text = this.state.text.trim();
        var title = this.state.title.trim();
        if (text && title) {
            var id = this.props.query.postId;
            if (id) {
                WikiActions.updatePost(id, title, text);
                this.transitionTo("wiki");
            } else {
                WikiActions.createPost(title, text);
                this.transitionTo("wiki");
            }
        } else if (text) {
            this.state.err = "Please enter a title for your awesome post!";
        } else if (title) {
            this.state.err = "Please enter some text for your excellent post!";
        } else {
            this.state.err = "Please and title and some text for your lovely post!";
        }
        this.toggleNotice();
    },

    toggleNotice: function () {
        this.setState({
            noticeOpen: !this.state.noticeOpen
        });
    },

    toggleWarning: function () {
        this.setState({
            warningOpen: !this.state.warningOpen
        });
    },

    _getTitle () {
        return this.state.title;
    },

    _getText () {
        return this.state.text;
    },

    _onTitleChange: function (title) {
        this.setState({title: title});
    },

    _onChange: function (text) {
        this.setState({text: text});
    }
});

var Editor = React.createClass({

    getInitialState: function () {
        return (
        {title: this.props.getTitle(),
        text: this.props.getText()}
        );
    },

    onTitleChange: function (event, value) {
        this.setState({title: event.target.value});
        this.props.titleChange(event.target.value);
    },

    onChange: function (event, value) {
        this.setState({text: event.target.value});
        this.props.textChange(event.target.value);
    },

    render: function () {
        return (
            <section className="wiki-edit-text">
                <input
                    className="titlebox"
                    placeholder="Title"
                    rows="1"
                    onChange={this.onTitleChange}
                    value={this.state.title}
                    />
                <textarea
                    className="inputbox"
                    placeholder="Your insights here"
                    onChange={this.onChange}
                    value={this.state.text}
                    />
            </section>
        );
    }
});

var Preview = React.createClass({
    render: function () {

        var title = this.props.getTitle();
        var text = this.props.getText();
        var post = WikiUtils.Post(title, text);
        var markedPost = WikiUtils.markdownPost(post);
        return (
             markedPost
        );
    }
});

module.exports = {
    WikiNew: WikiEditor,
    WikiEdit: Editor,
    WikiPreview: Preview
};
