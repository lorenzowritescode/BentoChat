'use strict';

var React = require('react/addons');
var Link = require('react-router').Link;
var logout = require('../actions/LoginActions').logoutUser;


require('styles/BentoNav.sass');

var BentoNav = React.createClass({

  render: function () {
    return (
        <div className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="app">
                        BentoChat
                    </Link>
                </div>
                <ul className="nav navbar-nav">
                    <li><Link to="chat">Chat</Link></li>
                    <li><Link to="wiki">Wiki</Link></li>
                    <li><Link to="todo">ToDos</Link></li>
                </ul>
                <button type="button"
                        className="btn btn-info navbar-btn pull-right"
                        onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
      );
  }
});

module.exports = BentoNav;

