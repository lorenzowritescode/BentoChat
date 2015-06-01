'use strict';

var React = require('react/addons'),
    WikiActions = require('../actions/WikiAction'),
    RouteHandler = require('react-router').RouteHandler,
    Link = require('react-router').Link;


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

    getInitialState: function () {
        return (
        {text: '',
        title: '',
        preview: ''}
        );
    },

    changeTab: function(tab) {
        this.setState({currentTab: tab.id});
    },

    render: function () {

        return (
            <div className="full-size">
                <Tabs className="tabs" />
                <div className="save-button" onClick={this.send}>
                    <Link to="wiki" className="btn btn-success save-wiki">
                        <span className="glyphicon glyphicon-ok"></span> Save
                    </Link>
                </div>
                <RouteHandler {...{textChange: this._onChange,
                    titleChange: this._onTitleChange}}/>
            </div>
        );
    },

    send: function () {
        var text = this.state.text.trim();
        var title = this.state.title.trim();
        if (text) {
            WikiActions.createPost(title, text);
        }
    },

    _onTitleChange: function (title) {
        console.log("yup");
        this.setState({title: title});
    },

    _onChange: function (text) {
        this.setState({text: text});
    }
});

var Editor = React.createClass({

    getInitialState: function () {
        return (
        {title: '',
        text: ''}
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
                <textarea
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
        return (
            <div>
                Bow chicka bow bow
            </div>
        );
    }
});

module.exports = {
    WikiNew: WikiEditor,
    WikiEdit: Editor,
    WikiPreview: Preview
};
