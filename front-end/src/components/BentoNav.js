'use strict';

var React = require('react/addons');
var Link = require('react-router').Link;
var logout = require('../actions/LoginActions').logoutUser;
import GroupStore from '../stores/GroupStore';
import messageActions from '../actions/messageAction';

require('styles/BentoNav.sass');
var logo_small = require('../images/bento-logo-medium.png');

class GroupPicker extends React.Component {
    constructor () {
        this.state = {
            groups: []
        };
    }

    componentDidMount () {
        GroupStore.addChangeListener(this._onChange.bind(this));
        messageActions.fetchGroups();
    }

    componentWillUnmount () {
        GroupStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange () {
        this.setState({
            groups: GroupStore.groupNames
        });
    }

    changeGroup (e) {
        var selection = e.target.text;
        if (selection !== GroupStore.current) {
            messageActions.changeGroup(selection);
        }
    }

    render () {
        var elems = this.state.groups.map((groupName) => {
            return <li><a onClick={this.changeGroup.bind(this)}>{groupName}</a></li>;
        });

        return (
            <div className="navbar-btn group-picker pull-right dropdown">
                <a href="#" className="btn btn-default dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                    Change Group  <span className="caret"></span>
                </a>
                <ul className="dropdown-menu" role="menu">
                    {elems}
                </ul>
            </div>
        );
    }
}

var BentoNav = React.createClass({

  render: function () {
    return (
        <div className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="app">
                        <img alt="Brand" src={logo_small} />
                    </Link>
                </div>
                <ul className="nav navbar-nav">
                    <li><Link to="chat">Chat</Link></li>
                    <li><Link to="wiki">Wiki</Link></li>
                    <li><Link to="todo">ToDos</Link></li>
                    <li><Link to="profile">Profile</Link></li>
                </ul>
                <button type="button"
                        className="btn btn-warning navbar-btn pull-right"
                        onClick={logout}>
                    <span className="glyphicon glyphicon-off"></span>
                </button>
                <GroupPicker />
            </div>
        </div>
      );
  }
});

module.exports = BentoNav;

