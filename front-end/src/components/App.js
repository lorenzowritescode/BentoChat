'use strict';

var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;



require('styles/App.sass');

var App = React.createClass({

    render: function () {
        return (
            <div>
                <p>Content for App</p>
                <RouteHandler />
            </div>
        );
    }
});

module.exports = App;

