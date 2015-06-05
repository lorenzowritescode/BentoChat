/**
 * Created by sambudd on 04/06/2015.
 */
'use strict';
var React = require('react/addons'),
    RouteHandler = require('react-router').RouteHandler;

require('styles/Register.sass');
var Link = require('react-router').Link;

var Register = React.createClass({

    getInitialState: function () {
        return (
        {
            username: '',
            email: '',
            password1: '',
            password2: ''
        }
        );
    },

    _onSubmit: function(e) {
        e.preventDefault();
        var username = this.state.username.trim();
        var email = this.state.email.trim();
        var password = this.state.password1.trim();
        if (username && email && password === this.state.password2) {
            //create these
            //var user = new userUtils.User(user);
            //UserActions.createUser(user);

            this.setState({text: ''});
            this.setState({author: ''});
            this.setState({title: ''});
        } else {
            //handlestuff
        }
    },

    render: function () {
        return (
            <div className="register-body">
                <div className="register-content">
                    <div className="username">
                        <input type="text"
                               className="form-control"
                               valueLink={this.linkState('username')}
                               placeholder="Username"
                               aria-describedby="basic-addon1">
                        </input>
                    </div>
                    <div className="email">
                        <input type="text"
                               className="form-control"
                               valueLink={this.linkState('email')}
                               placeholder="Email"
                               aria-describedby="basic-addon1">
                        </input>
                    </div>
                    <div className="password1">
                        <input type="password"
                               className="form-control"
                               valueLink={this.linkState('password1')}
                               placeholder="Password">
                        </input>
                    </div>
                    <div className="password2">
                        <input type="password"
                               className="form-control"
                               valueLink={this.linkState('password2')}
                               placeholder="Repeat Password"
                               aria-describedby="basic-addon1">
                        </input>
                    </div>
                    <button type="submit" onClick={this._onSubmit}
                            className="btn btn-block btn-primary">
                        Register
                    </button>
                    <Link to="login" className="btn btn-block btn-default">
                        Cancel
                    </Link>
                </div>
            </div>
        );
    }
});

module.exports = Register;

