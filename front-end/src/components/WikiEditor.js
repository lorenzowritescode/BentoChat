'use strict';

var React = require('react/addons');
var Link = require('react-router').Link;


require('styles/WikiEditor.sass');

var WikiEditor = React.createClass({

    render: function () {
        return (
            <div className="full-size">
                <div className="editor-container">
                    <div className="wiki-edit-text">
                        <div><h3>Edit</h3></div>
                        <input className="inputbox"/>
                    </div>
                    <div className="wiki-edit-preview">
                        <div><h3>Preview</h3></div>
                        <textarea readOnly />
                    </div>
                </div>
                <div className="button-drawer">
                    <Link to="chat" className="btn btn-success save-wiki">
                        <span className="glyphicon glyphicon-ok"></span> Save
                    </Link>
                </div>
            </div>
        );
    }
});

module.exports = WikiEditor;
