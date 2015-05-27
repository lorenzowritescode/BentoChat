'use strict';

var React = require('react/addons');

require('styles/Wiki.sass');

var Wiki = React.createClass({

    render: function () {
        return (
            <div className="wiki-body">
                <div className="wiki-content">
                    <p>Content for Wiki</p>
                </div>
                <div className="wiki-nav">
                    <p> Navigation </p>
                </div>
                <div className="wiki-side">
                    History info baby
                </div>
            </div>
        );
    }
});

module.exports = Wiki;

