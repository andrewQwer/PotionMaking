'use strict';

var React = require('react');
var RegisterAction = require('../actions/RegisterAction');
var UserStore = require('../stores/UserStore');
var TokenStore = require('../stores/TokenStore');
var History = require('react-router').History;
var config = require('../config');

var Register = React.createClass({
    mixins: [History],
    componentDidMount: function () {
        var validation = $.extend({}, {
            rules: {
                'reg-username': {required: true, minlength: 3},
                'reg-email': {required: true, email: true},
                'reg-pass': {required: true, minlength: 6},
                'reg-repeat-pass': {equalTo: '#reg-pass'}
            }
        }, config.Validation.Registration);
        $('#reg-form').validate(validation);
        UserStore.addRegisterListener(this._onRegister);
        UserStore.addRegisterFailListener(this._onFailRegister);
    },
    componentWillUnmount: function () {
        UserStore.removeRegisterListener(this._onRegister);
        UserStore.removeRegisterFailListener(this._onFailRegister);
    },
    _onRegister: function () {
        //this will allow to open success page only once after registration
        var registrationToken = TokenStore.generateRegistrationToken();
        this.history.pushState(null, config.LocalUrl.RegisterSuccess, {rt: registrationToken});
    },
    _onFailRegister: function () {
        for (var item in arguments) {
            toastr.error(arguments[item]);
        }
        $(this.refs.submitBtn).button('reset');
    },
    submitRegistration: function () {
        if ($('#reg-form').valid()) {
            var regData = {
                username: this.refs.username.value,
                email: this.refs.email.value,
                password: this.refs.pass.value,
                confirmPassword: this.refs.confirmPass.value,
            }
            $(this.refs.submitBtn).button('loading');
            RegisterAction.registerUser(regData);
        } else {
            toastr.error(config.Messages.FillInputs);
        }
    },
    render: function () {
        return (
            <div className="register-component">
                <form id="reg-form">
                    <div className="form-group">
                        <label htmlFor="reg-username">Имя пользователя</label>
                        <input type="text" ref="username" id="reg-username" name="reg-username" className="form-control"
                               placeholder="Введите имя пользователя"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-email">Email</label>
                        <input type="text" ref="email" id="reg-email" name="reg-email" className="form-control"
                               placeholder="Введите email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-pass">Пароль</label>
                        <input type="password" ref="pass" id="reg-pass" name="reg-pass" className="form-control"
                               placeholder="Введите пароль"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-repeat-pass">Повторите пароль</label>
                        <input type="password" ref="confirmPass" id="reg-repeat-pass" name="reg-repeat-pass" className="form-control"
                               placeholder="Повторите пароль"/>
                    </div>
                    <div className="form-group">
                        <input ref="submitBtn" type="button" data-loading-text="Загрузка..." className="btn btn-default" onClick={this.submitRegistration}
                               value="Зарегестрироваться"/>
                    </div>
                </form>
            </div>
        )
    }
});

module.exports = Register;

