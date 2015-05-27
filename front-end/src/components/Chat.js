'use strict';

var React = require('react/addons');

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
    render: function () {
        return (
            <div className="messagebox">
                <textarea />
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
