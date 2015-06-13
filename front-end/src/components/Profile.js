'use strict';

var React = require('react/addons');
import LoginStore from '../stores/LoginStore';


require('styles/Profile.sass');

var Profile = React.createClass({

    render: function () {
        var user = LoginStore.user;

        var getElem = (field) => {
            return (
                <div className={field}>
                    {user[field]}
                </div>
            );
        };

        var elems = ['fullName', 'username', 'email'].map(getElem);

        return (
            <div className="profile-panel">
                {elems}
            </div>
        );
    }
});

module.exports = Profile;

