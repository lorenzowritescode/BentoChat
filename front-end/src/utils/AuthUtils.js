'use strict';

import request from 'reqwest';
import when from 'when';
import {LOGIN_URL, REGISTER_URL} from '../constants/APIConstants';
import LoginActions from '../actions/LoginActions';

class AuthService {

    login(email, password) {
        var loginPromise =  when(request({
            url: LOGIN_URL,
            method: 'POST',
            crossOrigin: true,
            type: 'json',
            data: {
                email, password
            }
        }));

        loginPromise.then(function(response) {
            var jwt = response.auth_token;
            LoginActions.loginUser(jwt);
            return true;
        });

        return loginPromise;
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

    formatDetails (fullName, username, email, password) {
       if (fullName && username && email && password) {
           return {
               fullName, username, email, password
           };
       } else {
           throw new Error('Some fields are blank!');
       }
    }
}

export default new AuthService();
