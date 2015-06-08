'use strict';
import Dispatcher from '../dispatcher/WebappAppDispatcher';
import {LOGIN_USER, LOGOUT_USER} from '../constants/ActionConstants.js';
import RouterContainer from '../utils/RouterContainer';

export default {
    loginUser: (jwt) => {
        var savedJwt = localStorage.getItem('jwt');

        if (savedJwt !== jwt) {
            var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';

            RouterContainer.get().transitionTo(nextPath);
            localStorage.setItem('jwt', jwt);
        }

        Dispatcher.dispatch({
            actionType: LOGIN_USER,
            jwt: jwt
        });
    },
    logoutUser: () => {
        RouterContainer.get().transitionTo('/login');
        localStorage.removeItem('jwt');
        Dispatcher.dispatch({
            actionType: LOGOUT_USER
        });
    }
};
