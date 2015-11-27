'use strict';
var dispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('./ActionConstants');

var loginAction = {
    loginUser: function (data) {
        dispatcher.dispatch({
            type: ActionConstants.LOGIN_USER,
            data: data
        });
    }
}

module.exports = loginAction;

