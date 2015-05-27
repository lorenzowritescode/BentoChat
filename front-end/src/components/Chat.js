'use strict';

var React = require('react/addons');
var MessageActions = require('../actions/messageAction');

var ReactTransitionGroup = React.addons.TransitionGroup;

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
            <div>
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
            <div>
            <textarea
                className="messageBox"
                name="message"
                value={this.state.text}
                onChange={this._onChange}
                onKeyDown={this._onKeyDown}/>
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

var Chat = React.createClass({
  render: function() {
    return (
      <div className='main'>
        <ReactTransitionGroup transitionName="fade">
            <ChatList />
            <NewMessageBox />
        </ReactTransitionGroup>
      </div>
    );
  }
});

module.exports = Chat;
