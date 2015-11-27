'use strict';

var React = require('react');
var History = require('react-router').History;
var config = require('../config');
var LoginAction = require('../actions/LoginAction');
var UserStore = require('../stores/UserStore');

var Login = React.createClass({
    mixins: [History],
    componentDidMount: function () {
        var validation = $.extend({}, {
            rules: {
                'auth-username': {required: true, minlength: 3},
                'auth-password': {required: true, minlength: 6},
            }
        }, config.Validation.Login);
        $('#auth-form').validate(validation);
        UserStore.addLoginListener(this._onLogin);
        UserStore.addLoginFailListener(this._onFailLogin);
    },
    componentWillUnmount: function () {
        UserStore.removeLoginListener(this._onLogin);
        UserStore.removeLoginFailListener(this._onFailLogin);
    },
    _onLogin: function () {
        //go to root path
        this.history.pushState(null, '/');
    },
    _onFailLogin: function () {
        for (var item in arguments) {
            toastr.error(arguments[item]);
        }
    },
    submitLogin: function() {
        if ($('#auth-form').valid()) {
            var authData = {
                username: this.refs.login.value,
                password: this.refs.password.value
            }
            LoginAction.loginUser(authData);
        } else {
            toastr.error("Заполните правильно все необходимые поля")
        }
    },
    render: function () {
        return (
            <div className="login-component">
                <form id="auth-form">
                    <div className="form-group">
                        <label htmlFor="auth-username">Email address</label>
                        <input type="text"
                               className="form-control"
                               id="auth-username"
                               name="auth-username"
                               placeholder="Username"
                               ref="login"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="auth-password">Password</label>
                        <input type="password"
                               className="form-control"
                               id="auth-password"
                               name="auth-password"
                               placeholder="Password"
                               ref="password"
                        />
                    </div>
                    <div className="form-group">
                        <input type="button" className="btn btn-default" value="Submit" onClick={this.submitLogin}/>
                    </div>
                </form>
            </div>
        )
    }
});

module.exports = Login;

