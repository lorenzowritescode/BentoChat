'use strict';

var React = require('react/addons');

var ReactTransitionGroup = React.addons.TransitionGroup;

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
    render: function () {
        return (
            <textarea />
        );
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
