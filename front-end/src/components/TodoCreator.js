/**
 * Created by sambudd on 28/05/2015.
 */
'use strict';

var React = require('react/addons'),
    TodoActions = require('../actions/todoActions'),
    TodoStore = require('../stores/TodoStore'),
    todoUtils = require('../utils/TodoUtils');

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
        if (author && title) {
            var todo = new todoUtils.Todo(author, title, text);
            TodoActions.createTodo(todo);
            this.setState({text: ''});
            this.setState({author: ''});
            this.setState({title: ''});
        }
    },

    render: function() {
        return (
            <div className="todoc-body">
                <div className="todoc-form">
                    <div className="todo-author">
                        <input
                            className="form-control author-box"
                            name="author"
                            value={this.state.author}
                            onChange={this._onAuthorChange}
                            placeholder="Who's Task is it?"/>
                        <button className="btn btn-default">
                            Assignee
                        </button>
                    </div>
                    <div className="title-due">
                        <input
                            className="form-control title-box"
                            name="title"
                            value={this.state.title}
                            onChange={this._onTitleChange}
                            placeholder="Todo Title"/>
                        <button className="btn btn-default">
                            Deadline
                        </button>

                    </div>
                    <div className="description-box">
                        <input
                            className="form-control desc-box"
                            name="text"
                            value={this.state.text}
                            onChange={this._onTextChange}
                            onKeyDown={this._onKeyDown}
                            placeholder="Todo Description"/>
                    </div>
                </div>
                <div className="create-button">
                    <button onClick={this._onSubmit} className="btn btn-success btn-block">
                        <span className="glyphicon glyphicon-ok"></span>
                    </button>
                </div>
            </div>);
    }
});

module.exports = TodoForm;
