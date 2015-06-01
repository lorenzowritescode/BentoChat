'use strict';

var React = require('react/addons'),
    MessageActions = require('actions/messageAction'),
    MessageStore = require('stores/ChatMessageStore'),
    ThemeManager = require('material-ui/lib/styles/theme-manager')(),
    Colors = require('material-ui/lib/styles/colors'),
    TextField = require('material-ui').TextField;

//Key code for 'enter' key
var ENTER_KEY_CODE = 13;

require('styles/Chat.sass');

//Get the messages from the store
function getStateFromStores() {
    return {
        messages: MessageStore.getAll()
    };
}

var ChatTimestamp = React.createClass({
    render: function () {
        var d = new Date(this.props.timestamp);
        var mins = d.getMinutes();
        mins = mins > 9 ? mins : '0' + mins;
        var hours = d.getHours();
        hours = hours > 9 ? hours : '0' + hours;
        return (
                <div className="timestamp">
                    {hours}:{mins}
                </div>
            );
    }
});

var ChatAuthor = React.createClass({
    render: function () {
        return <div className="author">{this.props.name}</div>;
    }
});

//The visual representation of a message
var ChatMessage = React.createClass({
    render: function () {
        var msg = this.props.message;
        return <div className="chat-row">
            <ChatTimestamp timestamp={msg.timestamp} />
            <ChatAuthor name={msg.author} />
            <div className="chat-text">{msg.body}</div>
        </div>;
    }
});

//Creates a message list item of the given message
function getMessage(message) {
    return (
        <ChatMessage
            key={message.id}
            message={message}
            />
    );
}

var ChatList = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    // "componentDidMount: Invoked once, both on the client and server,
    // immediately before the initial rendering occurs. " - Thanks internet.
    // This ensures that whenever the store changes, we call -onChange, which
    // resets the state from the store.
    componentDidMount: function() {
        MessageStore.addChangeListener(this._onChange);
        MessageActions.fetchMessages();
    },

    componentWillUnmount: function() {
        MessageStore.removeChangeListener(this._onChange);
    },

    componentDidUpdate: function() {
            var node = this.getDOMNode();
            node.scrollTop = node.scrollHeight;
    },

    render: function () {
        var MessageListItem = this.state.messages.map(getMessage);
        return (
            <div className="chatlist">
                {MessageListItem}
            </div>
        );
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    }
});

var promptArray = require('../constants/ChatVariables').placeholders;

function randomPrompt() {
    var rand = Math.floor(Math.random()*promptArray.length);
    return promptArray[rand];
}

var NewMessageBox = React.createClass({
    getInitialState: function () {
        return (
        {text: ''}
        );
    },

    render: function () {
        return (
            <div className="input-group message-box">
                <input
                    className="form-control text-box"
                    placeholder={randomPrompt()}
                    value={this.state.text}
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown} />
                <button onClick={this._onSubmit} className="btn btn-success input-group-addon send-btn">
                    <span className="glyphicon glyphicon-ok"></span>
                </button>
            </div>
        );
    },

    _onChange: function (event, value) {
        this.setState({text: event.target.value});
    },

    _onSubmit: function(event) {
        event.preventDefault();
        var text = this.state.text.trim();
        if (text) {
            //Here is where we create the action and send it to the dispatcher
            MessageActions.createMessage(text);
        }
        //Reset text box
        this.setState({text: ''});
    },

    //Send via enter key
    _onKeyDown: function(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            event.preventDefault();
            var text = this.state.text.trim();
            if (text) {
                //Here is where we create the action and send it to the dispatcher
                MessageActions.createMessage(text);
            }
            //Reset text box
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
