/**
 * Created by sambudd on 28/05/2015.
 */
'use strict';

var React = require('react/addons'),
    TodoActions = require('../actions/todoActions'),
    TodoStore = require('../stores/TodoStore'),
    todoUtils = require('../utils/TodoUtils'),
    Link = require('react-router').Link;

var ENTER_KEY_CODE = 13;

var TodoForm =  React.createClass({

    getInitialState: function () {
        return (
        {
            text: '',
            author: '',
            title: ''
        }
        );
    },

    _onTextChange: function (event, value) {
        this.setState({text: event.target.value});
    },

    _onAuthorChange: function (event, value) {
        this.setState({author: event.target.value});
    },

    _onTitleChange: function(event, value) {
        this.setState({title: event.target.value});
    },

    _onKeyDown: function(e) {
        if (e.keyCode === ENTER_KEY_CODE) {
            this._onSubmit(e);
        }
    },

    _onSubmit: function(e) {
        e.preventDefault();
        var text = this.state.text.trim();
        var author = this.state.author.trim();
        var title = this.state.title.trim();
        if (text) {
            var todo = new todoUtils.Todo(author, title, text);
            TodoActions.createTodo(todo);
        }
        this.setState({text: ''});
        this.setState({author: ''});
        this.setState({title: ''});
    },

    render: function() {
        return (
            <div className="todoc-body">
            <div className="todo-form">
                <div className="author-box">
                <textarea
                    className="AuthorBox"
                    name="author"
                    value={this.state.author}
                    onChange={this._onAuthorChange}
                    placeholder="Who's Task is it?"/>
                </div>
                <div className="todo-title">
                    <textarea
                        className="title-box"
                        name="title"
                        value={this.state.title}
                        onChange={this._onTitleChange}
                        placeholder="Todo Title"/>

                </div>
                <div className="description-box">
                <textarea
                    className="TextBox"
                    name="text"
                    value={this.state.text}
                    onChange={this._onTextChange}
                    onKeyDown={this._onKeyDown}
                    placeholder="Todo Description"/>
                </div>
                <div className="due-date">

                </div>
                <div className="btn-drawer btn-group btn-group-justified">
                    <Link to="todo">
                        <button className="btn btn-warning">
                        <span className="glyphicon glyphicon-remove"></span>
                            </button>
                    </Link>
                    <button onClick={this._onSubmit} className="btn btn-success btn-block">
                        <span className="glyphicon glyphicon-ok"></span>
                    </button>
                </div>
            </div>
            </div>);
    }
});

module.exports = TodoForm;
