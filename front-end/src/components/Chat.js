'use strict';

var React = require('react/addons'),
    MessageActions = require('../actions/messageAction'),
    MessageStore = require('../stores/ChatMessageStore');

//Key code for 'enter' key
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

//Get the messages from the store
function getStateFromStores() {
    return {
        messages: MessageStore.getAll()
    };
}

//The visual representation of a message
var ChatMessage = React.createClass({
    render: function () {
        return <div>
            <b>{this.props.author}</b>
            : {this.props.body}
        </div>;
    }
});

//Creates a message list item of the given message
function GetMessageList(message) {
    return (
        <ChatMessage
            key={message.id}
            author={message.authorName}
            body={message.text}
            />
    );
}

var ChatList = React.createClass({


    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        MessageStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        MessageStore.removeChangeListener(this._onChange);
    },

    render: function () {
        var MessageListItem = this.state.messages.map(GetMessageList);
        return (
            <div className="chatlist"   >
                {MessageListItem}
            </div>
        );
    },

    _onChange: function() {
        this.setState(getStateFromStores());
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
                onKeyDown={this._onKeyDown} />
            <button>Send</button>
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
