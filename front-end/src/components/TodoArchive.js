/**
 * Created by sambudd on 07/06/2015.
 */
'use strict';

var React = require('react/addons'),
    RouteHandler = require('react-router').RouteHandler,
    TodoActions = require('../actions/todoActions'),
    TodoStore = require('../stores/TodoStore');

require('styles/Todos.sass');
var Link = require('react-router').Link;

var ReactTransitionGroup = React.addons.TransitionGroup;

function getStateFromStores() {
    return {
        archived: TodoStore.getArchived()
    };
}

var Todo = React.createClass({

    _onArchive: function(e) {
        console.log(this.props.todo.id);
        e.preventDefault();
        var id = this.props.todo.id;
        if (id) {
            TodoActions.archiveTodo(id);
        }
    },

    render: function() {
        return (
            <div className="todo">
                <div className="todo-content">
                    <div className="todo-title">
                        {this.props.todo.title}
                    </div>
                    <div className="todo-desc">
                        <span className="glyphicon glyphicon-menu-right icon"></span>
                        {this.props.todo.text}
                    </div>
                    <div className="todo-assignee">
                        <span className="glyphicon glyphicon-user icon"></span>
                        {this.props.todo.author}
                    </div>
                </div>

                <div className="complete-button">
                    <button onClick={this._onArchive} className="btn btn-warning btn-block archive-btn">
                        Restore
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

var TodoArchive = React.createClass({

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

    render: function() {
        return (
            <div className="todo-body">
                <div className="test">
                <div className="todo-content">
                    <div className="archived-list">
                        <div className="title">
                           ~~~~~~ Archived ~~~~~~
                        </div>
                        <TodoList list={this.state.archived} className="archive-list"/>
                    </div>
                </div>
                    </div>
                <div className="todo-nav">
                    <Link to="todo" className="btn btn-default btn-block" activeClassName="disabled">
                        Back to Todos
                    </Link>
                </div>
                <div className="todo-side">
                    side
                </div>
            </div>
        );
    }
});

module.exports = TodoArchive;
