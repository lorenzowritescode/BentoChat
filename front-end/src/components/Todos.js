'use strict';

var React = require('react/addons');

//var ReactTransitionGroup = React.addons.TransitionGroup;

var ENTER_KEY_CODE = 13;


var Todo = React.createClass({
    render: function() {
        return (
            <div className="Todo">
                <h2 className="TodoAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>

        );
    }});

var TodoList = React.createClass({
    render: function() {
        var todoNodes = this.props.data.map(function (todo, index) {
            return (
                <Todo author={todo.author} key={index}>
                    {todo.text}
                </Todo>
            );
        });
        return (
            <div className="TodoList">
                {todoNodes}
            </div>
        );
    }
});

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
            var text = this.state.text;
            var author = this.state.text;
            if (text) {
                this.props.onTodoSubmit({author: author, text: text});
            }
            this.setState({text: ''});
            this.setState({author: ''});
        }

    },

    handleSubmit: function(e) {
        e.preventDefault();
        console.log(this.refs.author.value);
        var author = this.refs.author.value.trim();
        var text = this.refs.text.value.trim();
        if (!text || !author) {
            return;
        }
        this.props.onTodoSubmit({author: author, text: text});
    },

    render: function() {
        return (
            <div className="todoForm">
                <textarea
                    className="AuthorBox"
                    name="author"
                    value={this.state.author}
                    onChange={this._onAuthorChange}/>
                <textarea
                    className="TextBox"
                    name="text"
                    value={this.state.text}
                    onChange={this._onTextChange}
                    onKeyDown={this._onKeyDown} />
                <button onClick={this.handleSubmit}>Post</button>
            </div>);
    }
});



var Todos = React.createClass({
    getInitialState: function() {
        return {data: [{author: "Simba", text: "TAKE BACK THE KINGDOM"},
            {author: "Mufasa", text: "Probably kill Simba"},
            {author: "Mufasa", text: "and maybe get some lunch"}]};
    },

    handleTodoSubmit: function(todo) {
        var todos = this.state.data;
        var newTodos = todos.concat([todo]);
        this.setState({data: newTodos});
    },

    render: function() {
        return (
            <div>
                <h1> Todos: </h1>
                <TodoList data={this.state.data}/>
                <TodoForm onTodoSubmit={this.handleTodoSubmit}/>
            </div>
        );
    }
});

module.exports = Todos;
