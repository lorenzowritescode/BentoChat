'use strict';

var React = require('react/addons'),
    RouteHandler = require('react-router').RouteHandler,
    TodoActions = require('../actions/todoActions'),
    TodoStore = require('../stores/TodoStore'),
    Navigation = require('react-router').Navigation,
    TodoCreator = require('./TodoCreator');

require('styles/Todos.sass');
var Link = require('react-router').Link;

function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}

var ReactTransitionGroup = React.addons.TransitionGroup;

var Todo = React.createClass({
    mixins: [Navigation],

    handleClick: function () {
        this.transitionTo("todo-view", {todoid: this.props.todo.id});
    },

    _onSubmit: function(e) {
        e.preventDefault();
        var id = this.props.todo.id;
        if (id) {
            TodoActions.toggleTodo(id);
        }
    },

    _onArchive: function(e) {
        console.log(this.props.todo.id);
      e.preventDefault();
        var id = this.props.todo.id;
        if (id) {
            TodoActions.archiveTodo(id);
        }
    },

    render: function() {
        var link = linkify(this.props.todo.text);
        return (
            <div className="todo" >
                <div className="todo-content" onClick={this.handleClick}>
                    <div className="todo-title">
                        {this.props.todo.title}
                    </div>
                    <div className="todo-desc">
                        <span className="glyphicon glyphicon-menu-right icon"></span>
                        <div className="todo-desc-text" dangerouslySetInnerHTML={{__html: link}}></div>

                    </div>
                    <div className="assignee-due-date">
                        <div className="todo-assignee">
                            <span className="glyphicon glyphicon-user icon"></span>
                            {this.props.todo.author}
                        </div>
                        <div className="todo-due-date">
                            <p><i> {"Due Wed 12/07/15"}   </i></p>
                            </div>
                        </div>
                    </div>

                    <div className="complete-button">
                        <button onClick={this._onSubmit} className="btn btn-default btn-block todo-btn">
                            <span className="glyphicon glyphicon-ok todo-tick"></span>
                        </button>
                        <button onClick={this._onArchive} className="btn btn-warning btn-block archive-btn">
                            <span className="glyphicon glyphicon-trash"></span>
                        </button>
                    </div>
                </div>
        );
    }});

function returnTodo(todo) {
    return (
        <Todo
            key={todo.id}
            todo={todo}
            />
    );
}

var TodoList = React.createClass({
    render: function() {
        var TodoListItem
            = this.props.list.map(returnTodo);
        return (
            <div>
                {TodoListItem}
            </div>
        );
    }
});

var TodoBar = React.createClass({
    render: function () {
        var TodoForm = TodoCreator;
        return (
            <div className="todo-nav">
                <button type="button" className="btn btn-default btn-block new-button" data-toggle="modal" data-target="#myModal">
                    New
                </button>
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <div className="modal-title">Create a Todo</div>
                            </div>
                            <div className="modal-body">
                                <TodoForm />
                            </div>
                        </div>

                    </div>
                </div>
                <Link to="todo-archive" className="btn btn-warning btn-block archive-button" activeClassName="disabled">
                    Archive
                </Link>
            </div>
        );
}
});

var TodoSide = React.createClass({
    render: function () {
        return (
            <div className="todo-side">
                <button className="btn btn-default btn-block my-todos">
                    My Todos
                    </button>
                <button className="btn btn-default btn-block due-soon">
                    Due Soon
                    </button>

                </div>
        );
    }
});

function getStateFromStores() {
    return {
        completed: TodoStore.getCompleted(),
        pending: TodoStore.getPending()
    };
}

var TodosList = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        TodoStore.addChangeListener(this._onChange);
        TodoActions.fetchTodos();
    },

    componentWillUnmount: function() {
        TodoStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    },

    render: function () {
        return (
                <div className="todos-content">
                    <div className="todo-list">
                        <div className="title" align="center">
                            Todos
                        </div>
                        <TodoList list={this.state.pending} className="todo-list"/>
                    </div>
                    <div className="completed-list">
                        <div className="title">
                            Completed
                        </div>
                        <TodoList list={this.state.completed} className="completed-list"/>
                    </div>
                </div>
        );
    }
});

var Todos = React.createClass({

    render: function() {
        return (
            <div className="todos-body">
                <RouteHandler />
                <div className="todos-nav">
                    <TodoBar />
                </div>
                <div className="todos-side">
                    <TodoSide />
                </div>
            </div>
        );
    }
});

module.exports = {
    Todos: Todos,
    TodosList: TodosList
};
