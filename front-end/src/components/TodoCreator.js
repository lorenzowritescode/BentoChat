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
        {text: '',
            author: ''}
        );
    },

    _onTextChange: function (event, value) {
        this.setState({text: event.target.value});
    },

    _onAuthorChange: function (event, value) {
        this.setState({author: event.target.value});
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

    handleSubmit: function(e) {
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
            <div className="todoForm">
                <textarea
                    className="AuthorBox"
                    name="author"
                    value={this.state.author}
                    onChange={this._onAuthorChange}
                    placeholder="Who's Task is it?"/>
                <textarea
                    className="TextBox"
                    name="text"
                    value={this.state.text}
                    onChange={this._onTextChange}
                    onKeyDown={this._onKeyDown}
                    placeholder="What is the Task?"/>
                <button onClick={this.handleSubmit}>Post</button>
            </div>);
    }
});

module.exports = TodoForm;
