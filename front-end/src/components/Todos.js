'use strict';

var React = require('react/addons'),
    RouteHandler = require('react-router').RouteHandler,
    TodoActions = require('../actions/todoActions'),
    TodoStore = require('../stores/TodoStore');

require('styles/Todos.sass');
var Link = require('react-router').Link;

//var ReactTransitionGroup = React.addons.TransitionGroup;
function getStateFromStores() {
    return {
        todos: TodoStore.getAllTodos(),
        completedtodos: TodoStore.getAllCompleted()
    };
}

var Todo = React.createClass({
    render: function() {
        return (
            <div className="todo">
                <div className="todo-content">
                    <div className="todo-title">
                        {this.props.title}
                    </div>
                    <div className="todo-desc">
                        {this.props.body}
                    </div>
                    <div className="todo-assignee">
                        {this.props.author}
                    </div>
                </div>
                <div className="complete-button">
                    <button onClick={this._onSubmit} className="btn btn-success">
                        <span className="glyphicon glyphicon-ok"></span>
                    </button>
                </div>
            </div>
        );
    }});

function returnTodo(todo) {
    return (
        <Todo
            key={todo.id}
            author={todo.author}
            title={todo.title}
            body={todo.text}
            completed={todo.completed}
            />
    );
}



var TodoList = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        TodoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TodoStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    },

    render: function() {
        var TodoListItem
            = this.state.todos.reverse().map(returnTodo);
        return (
            <div>
                {TodoListItem}
            </div>
        );
    }
});

var CompletedTodoList = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        TodoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TodoStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    },

    render: function() {
        var TodoListItem = this.state.completedtodos.map(returnTodo);
        return (
            <div>
                {TodoListItem}
            </div>
        );
    }
});


var TodoBar = React.createClass({
    render: function () {
        return (
            <div>
                <Link to="todo-new" className="btn btn-info btn-block" activeClassName="disabled">
                    New
                </Link>
            </div>
        );
}
});



var Todos = React.createClass({
    render: function() {
        return (
            <div className="todo-body">
                <RouteHandler />
                <div className="todos-content">
                    <div className="todo-list">
                        <h2>Todos:</h2>
                        <TodoList />
                    </div>
                    {/*<div className="completed-list">
                        <h2>Completed:</h2>
                        <CompletedTodoList />
                    </div>*/}
                </div>
                <div className="todo-nav">
                    <TodoBar />
                </div>
                <div className="todo-side">
                    profile information?
                </div>
            </div>
        );
    }
});

module.exports = Todos;
