'use strict';

var React = require('react/addons'),
    Auth = require('../utils/AuthUtils'),
    reactMixin = require('react-mixin');


require('styles/Login.sass');
var logo = require('../images/bento-logo.png');

var Link = require('react-router').Link;

class ErrorForm extends React.Component {
    render () {
        var msg = this.props.msg;
        if (!msg || typeof msg !== 'string' || msg.trim() === '')
            return <div />;

        return (
            <div className="alert alert-dismissible alert-danger error-form">
                <button type="button" className="close" data-dismiss="alert">×</button>
                <h4>Oh snap! {this.props.title}</h4>
                <p>{msg}</p>
            </div>
        );
    }
}

class SuccessForm extends React.Component {
    render () {
        var msg = this.props.msg;
        if (!msg || typeof msg !== 'string' || msg.trim() === '')
            return <div />;

        return (
            <div className="alert alert-success success-form">
                <h4>{this.props.title || 'Success!'}</h4>
                <p>{msg}</p>
            </div>
        );
    }
}

export default class Login extends React.Component {

    constructor () {
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
        var query = this.props.query;

        return (
            <div className="login-panel">
                <img src={logo} className="bento-logo"/>
                <SuccessForm title={query.successTitle} msg={query.successPrompt} />
                <form role="form">
                    <div className="form-group">
                        <input type="text" valueLink={this.linkState('user')} placeholder="Email" className="form-control"/>
                        <input type="password" valueLink={this.linkState('password')} placeholder="Password" className="form-control"/>
                    </div>
                    <button type="submit" className="btn btn-block btn-primary" onClick={this.login.bind(this)}>
                        Login
                    </button>
                    <Link to="register" className="btn btn-block btn-default">
                        Register
                    </Link>
                </form>
                <ErrorForm title='Error logging in to Bento' msg={this.state.errorMessage} />
            </div>
        );
    }
}

Login.ErrorForm = ErrorForm;

// We’re using the mixin `LinkStateMixin` to have two-way databinding between our component and the HTML.
reactMixin(Login.prototype, React.addons.LinkedStateMixin);
