'use strict';

var React = require('react/addons'),
    Auth = require('../utils/AuthUtils'),
    reactMixin = require('react-mixin');


require('styles/Login.sass');
var Link = require('react-router').Link;

export default class Login extends React.Component {

    constructor() {
        this.state = {
            user: '',
            password: ''
        };
    }

// This will be called when the user clicks on the login button
    login(e) {
        e.preventDefault();
        Auth.login(this.state.user, this.state.password)
            .catch(function(err) {
                console.log("Error logging in", err);
            });
    }

    render() {
        return (
            <div className="login-panel">
                <form role="form">
                    <div className="form-group">
                        <input type="text" valueLink={this.linkState('user')}placeholder="Email" />
                        <input type="password" valueLink={this.linkState('password')} placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-block btn-primary" onClick={this.login.bind(this)}>Submit</button>
                    <Link to="register" className="btn btn-block btn-default">
                        Register
                    </Link>
                </form>
            </div>
        );
    }
}

// We’re using the mixin `LinkStateMixin` to have two-way databinding between our component and the HTML.
reactMixin(Login.prototype, React.addons.LinkedStateMixin);

