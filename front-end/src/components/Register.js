/**
 * Created by sambudd on 04/06/2015.
 */
'use strict';
var React = require('react/addons'),
    RouteHandler = require('react-router').RouteHandler,
    reactMixin = require('react-mixin'),
    Auth = require('../utils/AuthUtils'),
    ErrorForm = require('./Login').ErrorForm;

import RouterContainer from '../utils/RouterContainer';

require('styles/Register.sass');
var Link = require('react-router').Link;

export default class Register extends React.Component {

    constructor () {
        this.state = {
            username: '',
            email: '',
            password1: '',
            password2: '',
            errorMessage: '',
            name: '',
            surname: ''
        };
    }

    _onSubmit (e) {
        e.preventDefault();
        var name = this.state.name.trim();
        var surname = this.state.surname.trim();
        var username = this.state.username.trim();
        var email = this.state.email.trim();
        var password = this.state.password1.trim();

        try {
            if (password !== this.state.password2) {
                throw new Error('The passwords don\'t match');
            }

            var details = Auth.formatDetails(name, surname, username, email, password);
            Auth.signup(details)
                .catch((err) => {
                    this.setState({
                        errorMessage: err.responseText
                    });
                })
                .then((response) => {
                    RouterContainer.get().transitionTo('login', null, {
                        successPrompt: 'Account successfully created. Login with your details below.'
                    });
                });
        } catch (err) {
            this.setState({
                errorMessage: err.message || err.msg
            });
        }
    }

    render () {
        var getInputElem = (stateKey, type, placeholder) => {
            return (
                <div className={stateKey}>
                    <input type={type}
                           className="form-control"
                           valueLink={this.linkState(stateKey)}
                           placeholder={placeholder}
                           aria-describedby="basic-addon1">
                    </input>
                </div>
            );
        };

        var name = getInputElem('name', 'text', 'Name'),
            surname = getInputElem('surname', 'text', 'Surname'),
            username = getInputElem('username', 'text', 'Choose a Username'),
            email = getInputElem('email', 'text', 'Email'),
            pwd1 = getInputElem('password1', 'password', 'Password'),
            pwd2 = getInputElem('password2', 'password', 'Repeat Password');

        return (
            <div className="register-body">
                <div className="register-content">
                    {name}
                    {surname}
                    {username}
                    {email}
                    {pwd1}
                    {pwd2}
                    <button type="submit" onClick={this._onSubmit.bind(this)}
                            className="btn btn-block btn-primary">
                        Register
                    </button>
                    <Link to="login" className="btn btn-block btn-default">
                        Cancel
                    </Link>
                    <ErrorForm title='Error registering to Bento' msg={this.state.errorMessage} />
                </div>
            </div>
        );
    }
}

reactMixin(Register.prototype, React.addons.LinkedStateMixin);
