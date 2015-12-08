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
        //go to previous location or to root path
        var location = this.props.location;
        if (location.state && location.state.nextPathname) {
            this.history.replaceState(null, location.state.nextPathname)
        }else {
            this.history.replaceState(null, config.LocalUrl.Root);
        }
    },
    _onFailLogin: function () {
        for (var item in arguments) {
            toastr.error(arguments[item]);
        }
        $(this.refs.submitBtn).button('reset');
    },
    submitLogin: function() {
        if ($('#auth-form').valid()) {
            var authData = {
                username: this.refs.login.value,
                password: this.refs.password.value
            }
            $(this.refs.submitBtn).button('loading');
            LoginAction.loginUser(authData);
        } else {
            toastr.error(config.Messages.FillInputs);
        }
    },
    render: function () {
        return (
            <div className="login-component">
                <form id="auth-form">
                    <div className="form-group">
                        <label htmlFor="auth-username">Логин</label>
                        <input type="text"
                               className="form-control"
                               id="auth-username"
                               name="auth-username"
                               placeholder="Введите имя пользователя"
                               ref="login"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="auth-password">Пароль</label>
                        <input type="password"
                               className="form-control"
                               id="auth-password"
                               name="auth-password"
                               placeholder="Введите пароль"
                               ref="password"
                        />
                    </div>
                    <div className="form-group">
                        <input ref='submitBtn'
                               type="button"
                               className="btn btn-default"
                               data-loading-text="Вход..."
                               value="Войти"
                               onClick={this.submitLogin}/>
                    </div>
                </form>
            </div>
        )
    }
});

module.exports = Login;

