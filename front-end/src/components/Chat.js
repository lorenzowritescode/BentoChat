'use strict';

var React = require('react/addons'),
    MessageActions = require('actions/messageAction'),
    MessageStore = require('stores/ChatMessageStore'),
    API = require('../utils/APIUtils.js'),
    APIConstants = require('../constants/APIConstants.js'),
    $ = require('jQuery');

//Key code for 'enter' key
var ENTER_KEY_CODE = 13;

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
            author={message.author}
            body={message.body}
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

    render: function () {
        var MessageListItem = this.state.messages.map(GetMessageList);
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

var promptArray = [
    "What you gonna say bitch?",
    "Spit it out motherfucker",
    "What is love? What is life?",
    "Take a hold on your life",
    "If you try to fail, and succeed, which have you done?",
    "People Say nothing is impossible, but you do nothing everyday."
];

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
            <div className="messagebox">
            <textarea
                className="messageBox"
                name="message"
                value={this.state.text}
                onChange={this._onChange}
                onKeyDown={this._onKeyDown}
                placeholder={randomPrompt()}/>
            <button onClick={this._onSubmit}>Send</button>
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
        if (event.keyCode === ENTER_KEY_CODE){
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
