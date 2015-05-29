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

    // "componentDidMount: Invoked once, both on the client and server,
    // immediately before the initial rendering occurs. " - Thanks internet.
    // This ensures that whenever the store changes, we call -onChange, which
    // resets the state from the store.
    componentDidMount: function() {
        MessageStore.addChangeListener(this._onChange);
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
    "A diamond is merely a lump of coal that did well under pressure.",
    "Never put off until tomorrow what you can do the day after tomorrow.",
    "Try to be like the turtle – at ease in your own shell",
    "Life is like a sewer… what you get out of it depends on what you put into it.",
    "If you try to fail, and succeed, which have you done?",
    "People Say nothing is impossible, but you do nothing everyday.",
    "Even if you are on the right track, you’ll get run over if you just sit there.",
    "Failure is the condiment that gives success its flavor.",
    "If you think you are too small to make a difference, try sleeping with a mosquito.",
    "There are no traffic jams along the extra mile.",
    "Life is like photography. You need the negatives to develop.",
    "If you hit the target every time it’s too near or too big."
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
