'use strict';

var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var BentoNav = require('./BentoNav');

var injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

require('styles/HolyGrail.sass');
require('styles/App.sass');

var App = React.createClass({

    render: function () {
        return (
            <div className="bento-body">
                <BentoNav/>
                <RouteHandler />
            </div>
        );
    }
});

module.exports = App;

