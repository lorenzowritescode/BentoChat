'use strict';

var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var BentoNav = require('./BentoNav');

require('styles/App.sass');

var App = React.createClass({

    render: function () {
        return (
            <div>
                <BentoNav />
                <div className="container">
                    <RouteHandler />
                </div>
            </div>
        );
    }
});

module.exports = App;

