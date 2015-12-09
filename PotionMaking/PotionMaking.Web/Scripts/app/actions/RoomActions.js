'use strict';
var dispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('./ActionConstants');
var apiUtils = require('../utils/WebApiUtils');

var roomActions = {
    createRoom: function (data) {
        dispatcher.dispatch({
            data: data,
            type: ActionConstants.CREATE_ROOM
        });
        apiUtils.createRoom(data);
    }
};

module.exports = roomActions;

