'use strict';
var dispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('./ActionConstants');

var appAction = {
    loadUser: function () {
        dispatcher.dispatch({
            type: ActionConstants.LOAD_USER
        });
    }
};

module.exports = appAction;

