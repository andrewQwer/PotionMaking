'use strict';
var dispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('./ActionConstants');
var apiUtils = require('../utils/WebApiUtils');

var regAction = {
    registerUser: function (data) {
        dispatcher.dispatch({
            type: ActionConstants.REGISTER_USER,
            data: data
        });
        apiUtils.registerUser(data);
    }
};

module.exports = regAction;

