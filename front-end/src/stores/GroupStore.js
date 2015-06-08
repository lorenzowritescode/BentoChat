/**
 * Created by lp1813 on 08/06/15.
 */
import {UPDATE_STATUS, FETCH_GROUPS} from '../constants/GroupActionConstants';
import BaseStore from './BaseStore';

class GroupStore extends BaseStore {
    constructor () {
        super();
        this.subscribe(() => this._registerToAction.bind(this));
        this._groups = {};
        console.log(UPDATE_STATUS);
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
                this.emitChange();
                break;
            default:
                break;
        }
    }

    get groups() {
        return this._groups;
    }

    getGroup (groupName) {
        return this._groups[groupName];
    }
}

export default new GroupStore();
