'use strict';

var dispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../actions/ActionConstants');
var EventEmitter = require('wolfy87-eventemitter');
var config = require('../config');
var TokenStore = require('./TokenStore');
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
            var token = TokenStore.getAuthToken().access_token;
            $.ajax({
                    url: config.Url.LoadUser,
                    type: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
                .done(function (res) {
                    _currentUser = res;
                })
                .fail(function (res) {
                    if (res.status === 401) {
                        userStore.clearCurrentUser();
                    }
                })
                .always(function(){
                    if (cb) {
                        cb();
                    }
                })
        } else{
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
        case ActionConstants.REGISTER_USER:
            console.log('Register request: ', action.data);
            $.ajax({
                    url: config.Url.RegisterUser,
                    type: 'POST',
                    data: action.data
                })
                .done(function () {
                    userStore.emit(REGISTER_EVENT);
                })
                .fail(function (res) {
                    if (res.status === 400) {
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
                    }
                });
            break;
        case ActionConstants.LOGIN_USER:
            console.log('Login request: ', action.data);
            var authData = $.extend({}, action.data, {grant_type: 'password'});
            $.ajax({
                    url: config.Url.LoginUser,
                    type: 'POST',
                    data: authData
                })
                .done(function (data) {
                    TokenStore.setAuthToken(data);
                    userStore.loadUser(function(){
                        userStore.emit(LOGIN_EVENT);
                    });
                })
                .fail(function (res) {
                    if (res.status === 400) {
                        var resObj = res.responseJSON;
                        var errorMsg = resObj.error_description;
                        if (errorMsg) {
                            userStore.emit(LOGIN_FAIL_EVENT, [errorMsg]);
                        } else {
                            userStore.emit(LOGIN_FAIL_EVENT, [config.Messages.Oops]);
                        }
                    }
                });
            break;
        case ActionConstants.LOAD_USER:
            userStore.loadUser();
            break;
        default:
            // do nothing
            break;
    }
});

module.exports = userStore;
