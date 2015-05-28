'use strict';

var React = require('react/addons');
var Link = require('react-router').Link;


require('styles/BentoNav.sass');

var BentoNav = React.createClass({

  render: function () {
    return (
        <div className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">
                        BentoChat
                    </a>
                </div>
                <ul className="nav navbar-nav">
                    <li><Link to="chat">Chat</Link></li>
                    <li><Link to="wiki">Wiki</Link></li>
                    <li><Link to="todo">ToDos</Link></li>
                </ul>
            </div>
        </div>
      );
  }
});

module.exports = BentoNav;

