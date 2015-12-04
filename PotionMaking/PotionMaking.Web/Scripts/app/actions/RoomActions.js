'use strict';
var dispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('./ActionConstants');

var roomActions = {
    createRoom: function (data) {
        dispatcher.dispatch({
            data: data,
            type: ActionConstants.CREATE_ROOM
        });
    }
};

module.exports = roomActions;

