'use strict';

var React = require('react/addons'),
    MessageActions = require('actions/messageAction'),
    MessageStore = require('stores/ChatMessageStore'),
    ChatSide = require('../components/ChatSide');

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

function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}

//The visual representation of a message
var ChatMessage = React.createClass({
    render: function () {
        var msg = this.props.message;
        var linkedMsg = linkify(msg.body);
        return <div className="chat-row">
            <ChatTimestamp timestamp={msg.timestamp} />
            <ChatAuthor name={msg.author} />
            <div className="chat-text" dangerouslySetInnerHTML={{__html: linkedMsg}}></div>
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
        var MessageListItems = this.state.messages.map(getMessage);
        return (
            <div className="chatlist">
                {MessageListItems}
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
            this.send();
        }
    },

    send: function() {
        var text = this.state.text.trim();
        if (text) {
            //Here is where we create the action and send it to the dispatcher
            MessageActions.createMessage(text);
        }
        //Reset text box
        this.setState({text: ''});
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
                    <ChatSide />
                </div>
            </div>
        );
    }
});

module.exports = Chat;
