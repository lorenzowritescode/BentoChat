/**
 * Created by sambudd on 07/06/2015.
 */
'use strict';

var React = require('react/addons'),
    RouteHandler = require('react-router').RouteHandler,
    TodoActions = require('../actions/todoActions'),
    Navigation = require('react-router').Navigation,
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
    mixins: [Navigation],

    handleClick: function () {
        this.transitionTo("todo-view", {todoid: this.props.todo.id});
    },

    render: function() {
        var dueText = (this.props.todo.due ? "Due: " + this.props.todo.due : "");
        return (
            <div className="todo">
                <div className="todo-content" onClick={this.handleClick}>
                    <div className="todo-title">
                        {this.props.todo.title}
                    </div>
                    <div className="todo-desc">
                        <span className="glyphicon glyphicon-menu-right icon"></span>
                        {this.props.todo.text}
                    </div>
                    <div className="assignee-due-date">
                        <div className="todo-assignee">
                            <span className="glyphicon glyphicon-user icon"></span>
                            {this.props.todo.author}
                        </div>
                        <div className="todo-due-date">
                            <p><i> {dueText} </i></p>
                        </div>
                    </div>
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
            <div className="todos-body">
                <div className="todos-content">
                    <div className="archived-list">
                        <TodoList list={this.state.archived} className="archive-list"/>
                    </div>
                </div>
                <div className="todos-nav">
                    <Link to="todo" className="btn btn-default btn-block back-btn" activeClassName="disabled">
                        Back to Todos
                    </Link>
                </div>
            </div>
        );
    }
});

module.exports = TodoArchive;
