'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require('./App');
var Chat = require('./Chat');
var Wiki = require('./Wiki').Wiki;
var WikiNew = require('./WikiEditor').WikiNew;
var WikiPreview = require('./WikiEditor').WikiPreview;
var WikiEdit = require('./WikiEditor').WikiEdit;
var Todos = require('./Todos');
var TodoCreator = require('./TodoCreator');
var WikiViewer = require('./WikiViewer');
var WikiList = require('./Wiki').WikiListView;
var Login = require('./Login');
var AuthComp = require('./AuthenticatedComponent');
var Register = require('./Register');
import RouterContainer from '../utils/RouterContainer';

var AuthChat = new AuthComp(Chat);

var routes = (
    <Route path="/" handler={App} name="app">
        <Route path="login" name="login" handler={Login} />
        <Route path="register" name="register" handler={Register} />
        <Route path="chat" name="chat" handler={AuthChat} />
        <Route path="wiki" name="wiki" handler={Wiki}>
            <Route path="new" name="wiki-new" handler={WikiNew} >
                <Route path="preview" name="wiki-preview" handler={WikiPreview} />
                <Route path="edit" name="wiki-edit" handler={WikiEdit} />
                <DefaultRoute handler={WikiEdit} />
            </Route>
            <Route path="view/:wikiid" name="wiki-view" handler={WikiViewer} />
            <DefaultRoute handler={WikiList} />
        </Route>
        <Route path="/todo" name="todo" handler={Todos}>
            <Route path="new" name="todo-new" handler={TodoCreator} />
        </Route>
        <DefaultRoute handler={Chat} />
        <NotFoundRoute handler={App} />
    </Route>
);

var router = Router.create({routes});
RouterContainer.set(router);

var content = document.getElementById('content');
router.run(function (Root) {
    React.render(<Root />, content);
});
