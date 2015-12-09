'use strict';

var config = require('../config');
var ServerAction = require('../actions/ServerAction');
var TokenStore = require('../stores/TokenStore');

var utils = {
    registerUser: function (regData) {
        $.ajax({
                url: config.Url.RegisterUser,
                type: 'POST',
                data: regData
            })
            .done(function () {
                ServerAction.registerUserSuccess(regData);
            })
            .fail(function (res) {
                if (res.status === 400) {
                    ServerAction.registerUserFail(regData, res);
                }
            });
    },
    loginUser: function (loginData) {
        var authData = $.extend({}, loginData, {grant_type: 'password'});
        var self = this;
        $.ajax({
                url: config.Url.LoginUser,
                type: 'POST',
                data: authData
            })
            .done(function (data) {
                ServerAction.loginUserSuccess(data);
                self.loadUser();
            })
            .fail(function (res) {
                if (res.status === 400) {
                    ServerAction.loginUserFail(loginData, res);
                }
            });
    },
    loadUser: function () {
        var token = TokenStore.getAuthToken().access_token;
        var res =
            $.ajax({
                url: config.Url.LoadUser,
                type: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .done(function (data) {
                ServerAction.loadUserSuccess(data);
            })
            .fail(function (res) {
                if (res.status === 401) {
                    ServerAction.loadUserFail(res);
                }
            })
        return res;
    },
    createRoom: function(){

    }
};

module.exports = utils;
