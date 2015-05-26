'use strict';

var React = require('react/addons');
var Alert = require('react-bootstrap/lib/Alert');

var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('normalize.css');
require('../styles/main.css');

var imageURL = require('../images/yeoman.png');

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

var Chat = React.createClass({
  render: function() {
    return (
      <div className='main'>
        <ReactTransitionGroup transitionName="fade">
          <img src={imageURL} />
            <div>Hello World</div>
        {chat_messages.map(function (message) {
            return <ChatMessage data={message} />;
        })}

        </ReactTransitionGroup>
      </div>
    );
  }
});

module.exports = Chat;
