'use strict';

var React = require('react/addons'),
    Auth = require('../utils/AuthUtils'),
    reactMixin = require('react-mixin');


require('styles/Login.sass');

class ErrorForm extends React.Component {
    render () {
        var msg = this.props.msg;
        if (!msg)
            return <div />;

        return (
            <div className="panel panel-danger">
                <div className="panel-body">
                    Error Logging In to Bento
                </div>
                <div className="panel-footer">
                    {msg}
                </div>
            </div>
        );
    }
}

export default class Login extends React.Component {

    constructor() {
        this.state = {
            user: '',
            password: '',
            errorMessage: ''
        };
    }

// This will be called when the user clicks on the login button
    login(e) {
        e.preventDefault();
        var that = this;
        Auth.login(this.state.user, this.state.password)
            .catch (function(err) {
                that.setState({
                    errorMessage: err.responseText
                });
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
                </form>
                <ErrorForm msg={this.state.errorMessage} />
            </div>
        );
    }
}

// We’re using the mixin `LinkStateMixin` to have two-way databinding between our component and the HTML.
reactMixin(Login.prototype, React.addons.LinkedStateMixin);
