'use strict';

var dispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../actions/ActionConstants');
var EventEmitter = require('wolfy87-eventemitter');
var TokenStore = require('./TokenStore');
var apiUtils = require('../utils/WebApiUtils');
var config = require('../config');
var REGISTER_EVENT = 'register_event';
var REGISTER_FAIL_EVENT = 'register_fail_event';
var LOGIN_EVENT = 'login_event';
var LOGIN_FAIL_EVENT = 'login_fail_event';

var _currentUser = null;
var userStore = $.extend({}, EventEmitter.prototype, {
    isAuthorized: function () {
        return !!TokenStore.getAuthToken();
    },
    clearCurrentUser:function(){
        TokenStore.clearAuthToken();
        _currentUser = null;
    },
    loadUser: function (cb) {
        if (this.isAuthorized()) {
            apiUtils.loadUser()
                .always(function(){
                    if (cb) {
                        cb();
                    }
                })
        } else {
            if (cb) {
                cb();
            }
        }
    },
    getCurrentUser: function(){
        return _currentUser;
    },
    emit: function (evt, data) {
        this.trigger(evt, data);
    },
    /* Login */
    addLoginListener: function (callback) {
        this.on(LOGIN_EVENT, callback);
    },
    addLoginFailListener: function (callback) {
        this.on(LOGIN_FAIL_EVENT, callback);
    },
    removeLoginListener: function (callback) {
        this.off(LOGIN_EVENT, callback);
    },
    removeLoginFailListener: function (callback) {
        this.off(LOGIN_FAIL_EVENT, callback);
    },
    /* Register */
    addRegisterListener: function (callback) {
        this.on(REGISTER_EVENT, callback);
    },
    addRegisterFailListener: function (callback) {
        this.on(REGISTER_FAIL_EVENT, callback);
    },

    removeRegisterListener: function (callback) {
        this.off(REGISTER_EVENT, callback);
    },
    removeRegisterFailListener: function (callback) {
        this.off(REGISTER_FAIL_EVENT, callback);
    }
});

userStore.dispatchToken = dispatcher.register(function (action) {
    switch (action.type) {
        case ActionConstants.REGISTER_USER_SUCCESS:
            userStore.emit(REGISTER_EVENT);
            break;
        case ActionConstants.REGISTER_USER_FAIL:
            var res = action.result;
            var resObj = res.responseJSON;
            var modelState = resObj.modelState;
            var errors;
            if (modelState) {
                errors = modelState[""];
            }
            if (errors) {
                userStore.emit(REGISTER_FAIL_EVENT, errors);
            } else {
                userStore.emit(REGISTER_FAIL_EVENT, [resObj.message]);
            }
            break;
        case ActionConstants.LOGIN_USER_SUCCESS:
            break;
        case ActionConstants.LOGIN_USER_FAIL:
            var res = action.result;
            var resObj = res.responseJSON;
            var errorMsg = resObj.error_description;
            if (errorMsg) {
                userStore.emit(LOGIN_FAIL_EVENT, [errorMsg]);
            } else {
                userStore.emit(LOGIN_FAIL_EVENT, [config.Messages.Oops]);
            }
            break;
        case ActionConstants.LOAD_USER_SUCCESS:
            _currentUser = action.data;
            userStore.emit(LOGIN_EVENT);
            break;
        case ActionConstants.LOAD_USER_FAIL:
            _currentUser = null;
            break;
        default:
            // do nothing
            break;
    }
});

module.exports = userStore;
