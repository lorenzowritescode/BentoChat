'use strict';

var React = require('react/addons');
import LoginStore from '../stores/LoginStore';
import GroupStore from '../stores/GroupStore';


require('styles/Profile.sass');

class GroupWidget extends React.Component {
    render () {
        var groups = GroupStore.groups,
            groupElems = [];

        for (var groupName in groups) {
            var users = groups[groupName],
                userElems = users.map((user) => {
                    return (
                        <div className="user-widget">
                            <div className="fullName">
                                {user.fullName}
                            </div>
                            <div className="username">
                                {user.username}
                            </div>
                            <div className="email">
                                {user.email}
                            </div>
                        </div>
                    );
                });

            var groupComp = (
                <div className="group-widget">
                    <div className="group-name">
                        {groupName}
                    </div>
                    <div className="user-list">
                        {userElems}
                    </div>
                </div>
            );

            groupElems.push(groupComp);
        }

        return (
            <div className="group-panel">
                <div id="group-hint">
                    Your Groups
                </div>
                {groupElems}
                <div className="group-create">
                    <button href="#" className="btn btn-primary new-group-btn">
                        Create a New Group
                    </button>
                </div>
            </div>
        );
    }
}

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
            <div className="profile-page">
                <div className="profile-panel">
                    {elems}
                </div>
                <GroupWidget />
            </div>
        );
    }
});

module.exports = Profile;

