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
var linkify = require('../utils/ChatUtils').linkify;

require('styles/TodoViewer.sass');

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

    _onDelete: function(e) {
        e.preventDefault();
        var id = this.props.todo.id;
        var status = this.props.todo.status;
        if (id) {
            TodoActions.deleteTodo(id);
            if (status === "archived") {
                this.transitionTo("todo-archive");
            } else {
                this.transitionTo("todo");
            }
        }
    },

    onReturn: function () {
        if (this.props.todo.status === "archived") {
            this.transitionTo("todo-archive");
        } else {
            this.transitionTo("todo");
        }
    },

    render: function() {
        var link = linkify(this.props.todo.text);
        var dueText = (this.props.todo.due ? "Due: " + this.props.todo.due : "");
        var completeButton = (this.props.todo.status === "completed" ?
            "btn btn-success btn-block" : "btn btn-default btn-block");
        var archiveRestore = (this.props.todo.status === "archived" ?
            "Restore" : "Archive");
        return (
            <div className="todo">
                <div className="todo-content">
                    <div className="todo-title">
                        {this.props.todo.title}
                    </div>
                    <div className="todo-desc">
                        <span className="glyphicon glyphicon-menu-right icon"></span>
                        <span className="todo-desc-text" dangerouslySetInnerHTML={{__html: link}}></span>
                    </div>
                    <div className="due-date">
                        <p><i> {dueText} </i></p>
                    </div>
                    <div className="todo-assignee">
                        <span className="glyphicon glyphicon-user icon"></span>
                        {this.props.todo.author}
                    </div>
                </div>

                <div className="buttons">
                    <button onClick={this.onReturn} className="btn btn-default btn-block todo-btn">
                        <span className="glyphicon glyphicon-arrow-left todo-back"></span>
                    </button>
                    <button onClick={this._onSubmit} className={completeButton}>
                        <span className="glyphicon glyphicon-ok todo-tick"></span>
                    </button>
                    <button onClick={this._onArchive} className="btn btn-warning btn-block archive-btn">
                        {archiveRestore}
                    </button>
                    <button onClick={this._onDelete} className="btn btn-danger btn-block delete-btn">
                        Delete
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
                <div className="todo-view-content">
                <TodoSingle className="todo"
                            todo={todo} />
                <CommentSection itemid={this.props.params.todoid} />
                    </div>
            </div>
        );
    }
});

module.exports=TodoViewer;
