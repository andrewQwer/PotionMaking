'use strict';

var rand = function () {
    return Math.random().toString(36).substr(2); // remove `0.`
};
var _registrationToken = null;

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
            localStorage.setItem('token', JSON.stringify(token));
        }
    },
    getAuthToken: function(){
        var token = JSON.parse(localStorage.getItem('token'));
        return token;
    }
};

module.exports = tokenStore;
