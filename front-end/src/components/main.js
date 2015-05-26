'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./App');
var Chat = require('./Chat');
var Wiki = require('./Wiki');

var content = document.getElementById('content');

var Routes = (
    <Route path="/" handler={App} name="app">
        <Route path="/chat" name="chat" handler={Chat} />
        <Route path="/wiki" name="wiki" handler={Wiki} />
        <DefaultRoute handler={Chat} />
    </Route>
);

Router.run(Routes, function (Handler) {
    React.render(<Handler/>, content);
});
