'use strict';

var React = require('react/addons'),
    WikiActions = require('../actions/WikiAction'),
    Link = require('react-router').Link;


require('styles/WikiEditor.sass');

var WikiEditor = React.createClass({

    getInitialState: function () {
        return (
        {editorText: ''}
        );
    },

    render: function () {
        return (
            <div className="full-size">
                <div className="editor-container">
                    <div className="wiki-edit-text">
                        <div><h3>Edit</h3></div>
                        <textarea
                            className="inputbox"
                            onChange={this._onChange}
                            value={this.state.text}
                            />
                    </div>
                    <div className="wiki-edit-preview">
                        <div><h3>Preview</h3></div>
                        <textarea readOnly />
                    </div>
                </div>
                <div className="button-drawer" onClick={this.send}>
                    <Link to="wiki" className="btn btn-success save-wiki">
                        <span className="glyphicon glyphicon-ok"></span> Save
                    </Link>
                </div>
            </div>
        );
    },

    _onChange: function (event, value) {
        this.setState({text: event.target.value});
    },

    send: function () {
        var text = this.state.text.trim();
        if (text) {
            WikiActions.createPost(text);
        }
    }
});

module.exports = WikiEditor;
