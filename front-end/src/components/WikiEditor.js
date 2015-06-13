'use strict';

var React = require('react/addons'),
    WikiActions = require('../actions/WikiAction'),
    WikiUtils = require('../utils/WikiUtils'),
    RouteHandler = require('react-router').RouteHandler,
    Link = require('react-router').Link,
    Navigation = require('react-router').Navigation;


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
        return (
        {text: '',
        title: '',
        preview: null}
        );
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
                <RouteHandler {...{textChange: this._onChange,
                    titleChange: this._onTitleChange,
                    getTitle: this._getTitle,
                    getText: this._getText}}/>
            </div>
        );
    },

    onReturn: function () {
        var text = this.state.text.trim();
        var title = this.state.title.trim();
        if(text || title) {
            if (window.confirm("Are you sure you want to go back? You will lose all your hard work on this post!")) {
                this.transitionTo("wiki");
            }
        } else {
            this.transitionTo("wiki");
        }
    },

    send: function () {
        var text = this.state.text.trim();
        var title = this.state.title.trim();
        if (text && title) {
            WikiActions.createPost(title, text);
            this.transitionTo("wiki");
        } else if (text) {
            window.alert("Please enter a title for your awesome post!");
        } else if (title) {
            window.alert("Please enter some text for your excellent post!");
        } else {
            window.alert("Please and title and some text for your lovely post!");
        }
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
