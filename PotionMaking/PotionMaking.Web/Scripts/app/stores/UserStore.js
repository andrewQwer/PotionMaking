'use strict';

var dispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../actions/ActionConstants');
var EventEmitter = require('wolfy87-eventemitter');
var config = require('../config');

var REGISTER_EVENT = 'register_event';
var REGISTER_FAIL_EVENT = 'register_fail_event';

var userStore = $.extend({}, EventEmitter.prototype, {
    emit: function (evt, data) {
        this.trigger(evt, data);
    },

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
            .fail(function(res){
                if (res.status == 400) {
                    var resObj = res.responseJSON;
                    var modelState = resObj.modelState;
                    var errors;
                    if (modelState) {
                        errors = modelState[""];
                    }
                    if (errors) {
                        userStore.emit(REGISTER_FAIL_EVENT, errors);
                    } else {
                        userStore.emit(REGISTER_FAIL_EVENT, resObj.message);
                    }
                }
            });
        default:
            // do nothing
            break;
    }
});

module.exports = userStore;
