/**
 * Created by sambudd on 04/06/2015.
 */
'use strict';
var React = require('react/addons'),
    RouteHandler = require('react-router').RouteHandler;

require('styles/Register.sass');
var Link = require('react-router').Link;

var Register = React.createClass({
    render: function () {
        return (
            <div className="register-body">
                <div className="register-content">
                    <div className="username">
                        <input type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon1"></input>
                    </div>
                    <div className="email">
                        <input type="text" className="form-control" placeholder="Email" aria-describedby="basic-addon1"></input>
                    </div>
                    <div className="password">
                        <input type="text" className="form-control" placeholder="Password" aria-describedby="basic-addon1"></input>
                    </div>
                    <div className="repeat-password">
                        <input type="text" className="form-control" placeholder="Repeat Password" aria-describedby="basic-addon1"></input>
                    </div>
                    <button type="submit" className="btn btn-block btn-primary">Register</button>
                    <Link to="login" className="btn btn-block btn-default">
                        Cancel
                    </Link>
                </div>
            </div>
        );
    }
});

module.exports = Register;

