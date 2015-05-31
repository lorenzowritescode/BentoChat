/**
 * Created by sambudd on 28/05/2015.
 */
'use strict';

var React = require('react/addons'),
    TodoActions = require('../actions/todoActions'),
    TodoStore = require('../stores/TodoStore');

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
            e.preventDefault();
            var text = this.state.text.trim();
            var author = this.state.author.trim();
            if (text) {
                TodoActions.createTodo(author, text);
            }
            this.setState({text: ''});
            this.setState({author: ''});
        }

    },

    _onSubmit: function(e) {
        e.preventDefault();
        var text = this.state.text.trim();
        var author = this.state.author.trim();
        if (text) {
            TodoActions.createTodo(author, text);
        }
        this.setState({text: ''});
        this.setState({author: ''});
    },

    render: function() {
        return (
            <div className="todoc-body">
            <div className="todoForm">
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
                <button onClick={this._onSubmit} className="btn btn-success input-group-addon send-btn">
                    <span className="glyphicon glyphicon-ok"></span>
                </button>
            </div>
            </div>);
    }
});

module.exports = TodoForm;
