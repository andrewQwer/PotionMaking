'use strict';
var dispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('./ActionConstants');
var apiUtils = require('../utils/WebApiUtils');

var loginAction = {
    loginUser: function (data) {
        dispatcher.dispatch({
            type: ActionConstants.LOGIN_USER,
            data: data
        });
        apiUtils.loginUser(data);
    }
};

module.exports = loginAction;

