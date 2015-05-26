'use strict';

var React = require('react/addons');


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
                    <li><a href="#/chat">Chat</a></li>
                    <li><a href="#/wiki">Wiki</a></li>
                </ul>
            </div>
        </div>
      );
  }
});

module.exports = BentoNav;

