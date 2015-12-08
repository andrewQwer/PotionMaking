'use strict';

var dispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('./ActionConstants');

var serverActions = {
    registerUserSuccess: function (data) {
        dispatcher.dispatch({
            type: ActionConstants.REGISTER_USER_SUCCESS,
            data: data
        });
    },
    registerUserFail: function (data, res) {
        dispatcher.dispatch({
            type: ActionConstants.REGISTER_USER_FAIL,
            regData: data,
            result: res
        });
    },
    loginUserSuccess: function (data) {
        dispatcher.dispatch({
            type: ActionConstants.LOGIN_USER_SUCCESS,
            data: data
        });
    },
    loginUserFail: function (data, res) {
        dispatcher.dispatch({
            type: ActionConstants.LOGIN_USER_FAIL,
            loginData: data,
            result: res
        });
    },
    loadUserSuccess:function(data){
        dispatcher.dispatch({
            type: ActionConstants.LOAD_USER_SUCCESS,
            data: data
        });
    },
    loadUserFail:function(res){
        dispatcher.dispatch({
            type: ActionConstants.LOAD_USER_FAIL,
            result: res
        });
    }

};

module.exports = serverActions;