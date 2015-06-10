/**
 * Created by evenoli on 10/06/15.
 */
'use strict';

var React = require('react/addons'),
    TodoStore = require('../stores/TodoStore'),
    TodoActions=require('../actions/todoActions'),
    CommentSection = require('../components/Comments').CommentSection,
    RouteHandler = require('react-router').RouteHandler,
    Link = require('react-router').Link,
    Navigation = require('react-router').Navigation,
    BentoComment = require('../components/Comments').BentoComment;

require('styles/Todos.sass');

var TodoSingle = React.createClass({
    mixins: [Navigation],

    _onSubmit: function(e) {
        e.preventDefault();
        var id = this.props.todo.id;
        if (id) {
            TodoActions.toggleTodo(id);
        }
        this.transitionTo("todo");
    },

    _onArchive: function(e) {
        console.log(this.props.todo.id);
        e.preventDefault();
        var id = this.props.todo.id;
        if (id) {
            TodoActions.archiveTodo(id);
        }
        this.transitionTo("todo");
    },

    onReturn: function () {
        this.transitionTo("todo");
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
                        <span className="todo-desc-text">{this.props.todo.text}</span>
                    </div>
                    <div className="todo-assignee">
                        <span className="glyphicon glyphicon-user icon"></span>
                        {this.props.todo.author}
                    </div>
                </div>

                <div className="complete-button">
                    <button onClick={this.onReturn} className="btn btn-info btn-block todo-btn">
                        <span className="glyphicon glyphicon-arrow-left todo-back"></span>
                    </button>
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

var TodoViewer = React.createClass({

    render: function () {
        var todo = TodoStore.get(this.props.params.todoid);
        return (
            <div className="todo-view">
                <TodoSingle className="todo"
                            todo={todo} />
                <CommentSection itemid={todo.id} />
            </div>
        );
    }
});

module.exports=TodoViewer;
