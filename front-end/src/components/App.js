'use strict';

var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var BentoNav = require('./BentoNav');

require('styles/HolyGrail.sass');
require('styles/App.sass');

var App = React.createClass({

    render: function () {
        return (
            <div className="HolyGrail">
                <BentoNav/>
                <div>
                    <RouteHandler />
                </div>
            </div>
        );
    }
});

module.exports = App;

