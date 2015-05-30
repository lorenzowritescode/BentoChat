'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require('./App');
var Chat = require('./Chat');
var Wiki = require('./Wiki');
var WikiEditor = require('./WikiEditor');
var Todos = require('./Todos');
var TodoCreator = require('./TodoCreator');
var WikiViewer = require('./WikiViewer');

var Routes = (
    <Route path="/" handler={App} name="app">
        <Route path="chat" name="chat" handler={Chat} />
        <Route path="wiki" name="wiki" handler={Wiki}>
            <Route path="new" name="wiki-new" handler={WikiEditor} />
            <Route path="view/:wiki-id" name="wiki-view" handler={WikiViewer} />
            <DefaultRoute handler={WikiViewer} />
        </Route>
        <Route path="/todo" name="todo" handler={Todos}>
            <Route path="new" name="todo-new" handler={TodoCreator} />
        </Route>
        <DefaultRoute handler={Chat} />
        <NotFoundRoute handler={App} />
    </Route>
);


var content = document.getElementById('content');
Router.run(Routes, Router.HistoryLocation, function (Root, state) {
    React.render(<Root />, content);
});
