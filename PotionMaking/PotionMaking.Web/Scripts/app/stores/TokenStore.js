'use strict';

var dispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../actions/ActionConstants');

var rand = function () {
    return Math.random().toString(36).substr(2); // remove `0.`
};
var _registrationToken = null;
var AUTH_TOKEN_KEY = 'pm-auth-token';

var tokenStore = {
    generateToken: function () {
        return rand() + rand();
    },
    getLastRegistrationToken: function() {
        return _registrationToken;
    },
    clearRegistrationToken: function() {
        _registrationToken = null;
    },
    generateRegistrationToken: function() {
        var token = this.generateToken();
        _registrationToken = token;
        return token;
    },
    setAuthToken: function(token) {
        if (token) {
            token.created = new Date();
            localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token));
        }
    },
    getAuthToken: function(){
        var token = JSON.parse(localStorage.getItem(AUTH_TOKEN_KEY));
        return token;
    },
    clearAuthToken: function(){
        localStorage.removeItem(AUTH_TOKEN_KEY);
    }

};
tokenStore.dispatchToken = dispatcher.register(function (action) {
    switch (action.type) {
        case ActionConstants.LOGIN_USER_SUCCESS:
            tokenStore.setAuthToken(action.data);
            break;
        case ActionConstants.LOAD_USER_FAIL:
            tokenStore.clearAuthToken();
            break;
        default:
            // do nothing
            break;
    }
});
module.exports = tokenStore;
