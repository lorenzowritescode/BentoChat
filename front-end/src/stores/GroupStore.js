/**
 * Created by lp1813 on 08/06/15.
 */
import {UPDATE_STATUS, FETCH_GROUPS, USER_ONLINE, CHANGE_GROUP} from '../constants/ActionConstants';
import BaseStore from './BaseStore';

const ONLINE_STATUS = 'online',
      OFFLINE_STATUS = 'offline';

class GroupStore extends BaseStore {
    constructor () {
        super();
        this.subscribe(() => this._registerToAction.bind(this));
        this._groups = {};
    }

    _registerToAction (action) {
        switch (action.type) {
            case UPDATE_STATUS:
                if (action.groupName in this._groups) {
                    this._groups[action.groupName] = action.status;
                }
                this.emitChange();
                break;
            case FETCH_GROUPS:
                this._groups = action.groups;
                this._curr_group = Object.keys(action.groups)[0];
                this.emitChange();
                break;
            case USER_ONLINE:
                this._groups['test-group'] = action.group;
                this.emitChange();
                break;
            case CHANGE_GROUP:
                var newGroup = action.groupName;
                if (newGroup in this._groups) {
                    this._curr_group = newGroup;
                    this.emitChange();
                }
                break;
            default:
                break;
        }
    }

    get groups() {
        return this._groups;
    }

    get current () {
        return this._curr_group;
    }

    get groupNames () {
        var groupNames = [];

        for (var group in this.groups) {
            groupNames.push(group);
        }

        return groupNames;
    }

    _updateStatus(username, groupName, status) {
        var group  = this.getGroup(groupName) || [];

        group.forEach(function (user) {
            if (user.username === username)
                user.status = status;
        });
    }
    getGroup (groupName) {
        return this._groups[groupName];
    }
}

export default new GroupStore();
