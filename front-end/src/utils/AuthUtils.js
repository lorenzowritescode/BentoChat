'use strict';

import request from 'reqwest';
import when from 'when';
import {LOGIN_URL, REGISTER_URL} from '../constants/APIConstants';
import LoginActions from '../actions/LoginActions';

class AuthService {

    login(email, password) {
        return this.handleAuth(when(request({
            url: LOGIN_URL,
            method: 'POST',
            crossOrigin: true,
            type: 'json',
            data: {
                email, password
            }
        })));
    }

    logout() {
        LoginActions.logoutUser();
    }

    signup(details) {
        return when(request({
            url: REGISTER_URL,
            method: 'POST',
            crossOrigin: true,
            type: 'json',
            data: details
        }));
    }

    formatDetails (givenName, surname, username, email, password) {
       if (givenName && surname && username && email && password) {
           return {
               givenName, surname, username, email, password
           };
       } else {
           throw new Error('Some fields are blank!');
       }
    }

    handleAuth(loginPromise) {
        return loginPromise
            .then(function(response) {
                var jwt = response.id_token;
                LoginActions.loginUser(jwt);
                return true;
            });
    }
}

export default new AuthService();
