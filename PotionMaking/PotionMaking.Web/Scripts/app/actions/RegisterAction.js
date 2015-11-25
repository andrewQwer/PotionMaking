'use strict';
var dispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('./ActionConstants');

var regAction = {
    registerUser: function (data) {
        dispatcher.dispatch({
            type: ActionConstants.REGISTER_USER,
            data: data
        });
    }
}

module.exports = regAction;

