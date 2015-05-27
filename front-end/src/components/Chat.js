'use strict';

var React = require('react/addons');
var MessageActions = require('../actions/messageAction');

var ENTER_KEY_CODE = 13;

var chat_messages = [
    {
        author: "Lorenzo",
        body: "Yerrrrr a wizaaard harry"
    },
    {
        author: "Oli",
        body: "I'mmm a whaaattttt"
    },
    {
        author: "Sam",
        body: "Why do I pay you MONEEEY"
    }
];

require('styles/Chat.sass');

var ChatMessage = React.createClass({
    render: function () {
        return <div>
            <b>{this.props.data.author}</b>
            : {this.props.data.body}
        </div>;
    }
});

var ChatList = React.createClass({
    render: function () {
        return (
            <div className="chatlist"   >
                {chat_messages.map(function (message) {
                    return <ChatMessage data={message} />;
                })}
            </div>
        );
    }
});

var NewMessageBox = React.createClass({

    getInitialState: function () {
        return (
        {text: ''}
        );
    },

    render: function () {
        return (
            <div className="messagebox">
            <textarea
                className="messageBox"
                name="message"
                value={this.state.text}
                onChange={this._onChange}
                onKeyDown={this._onKeyDown}/>
            <button>Send</button>
            </div>
        );
    }
});

var ChatBar = React.createClass({
    render: function () {
        return (
            <div>
                Yoooooo
            </div>
        );
    },

    _onChange: function (event, value) {
        this.setState({text: event.target.value});
    },

    _onKeyDown: function(event) {
        if (event.keyCode === ENTER_KEY_CODE){
            event.preventDefault();
            var text = this.state.text.trim();
            if (text) {
                console.log(text);
                MessageActions.createMessage(text);
            }
            this.setState({text: ''});
        }
    }

});

var Chat = React.createClass({
    render: function() {
        return (
            <div className="chat-body">
                <div className="chat-content">
                    <ChatList />
                    <NewMessageBox />
                </div>
                <div className="chat-nav">
                    <ChatBar />
                </div>
                <div className="chat-side">
                    People's online/offline info
                </div>
            </div>
        );
    }
});

module.exports = Chat;
