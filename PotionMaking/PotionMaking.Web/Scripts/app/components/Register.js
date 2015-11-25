'use strict';

var React = require('react');
var RegisterAction = require('../actions/RegisterAction');
var UserStore = require('../stores/UserStore');

var Register = React.createClass({
    submitRegistration: function () {
        if ($('#reg-form').valid()) {
            var regData = {
                username: this.refs.username.value,
                email: this.refs.email.value,
                password: this.refs.pass.value,
                confirmPassword: this.refs.confirmPass.value,
            }
            RegisterAction.registerUser(regData);
        }
    },
    componentDidMount: function () {
        $('#reg-form').validate({
            rules: {
                'reg-username': {required: true, minlength: 3},
                'reg-email': {required: true, email: true, minlength: 3},
                'reg-pass': {required: true, minlength: 6},
                'reg-repeat-pass': {equalTo: '#reg-pass'}
            }
        });
        UserStore.addRegisterListener(this._onRegister);
        UserStore.addRegisterFailListener(this._onFailRegister);
        console.log('Did mount register component')
    },
    componentWillUnmount: function () {
        UserStore.removeRegisterListener(this._onRegister);
        UserStore.removeRegisterFailListener(this._onFailRegister);
        console.log('Unmount register component')
    },
    _onRegister: function () {
        alert('User successfully registered');
    },
    _onFailRegister: function () {
        for (var item in arguments) {
            alert(arguments[item]);
        }
    },
    render: function () {
        return (
            <div className="register-component">
                <form id="reg-form">
                    <div className="form-group">
                        <label htmlFor="reg-username">Username</label>
                        <input type="text" ref="username" name="reg-username" className="form-control"
                               placeholder="Username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-email">Email address</label>
                        <input type="text" ref="email" name="reg-email" className="form-control" placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-pass">Password</label>
                        <input type="password" ref="pass" id="reg-pass" name="reg-pass" className="form-control"
                               placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-repeat-pass">Repeat Password</label>
                        <input type="password" ref="confirmPass" name="reg-repeat-pass" className="form-control"
                               placeholder="Repeat password"/>
                    </div>
                    <div className="form-group">
                        <input type="button" className="btn btn-default" onClick={this.submitRegistration}
                               value="Submit"/>
                    </div>
                </form>
            </div>
        )
    }
});

module.exports = Register;

