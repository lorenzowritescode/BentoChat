'use strict';

var React = require('react/addons');
var marked = require('marked');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

require('styles/Wiki.sass');

var Wiki = React.createClass({

    render: function () {
        return (
            <div className="wiki-body">
                <div className="wiki-content">
                    <RouteHandler />
                </div>
                <div className="wiki-nav">
                    <Link to="wiki-new" className="btn btn-info btn-block" activeClassName="disabled">
                            New
                    </Link>
                </div>
                <div className="wiki-side">
                    History info baby
                </div>
            </div>
        );
    }
});

module.exports = Wiki;

