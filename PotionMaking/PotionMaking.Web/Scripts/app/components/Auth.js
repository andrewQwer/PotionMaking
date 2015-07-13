'use strict';

var React = require('react');
var Link = require('react-router').Link;
var Login = require('./Login');

var Auth = React.createClass({
    render: function () {
        return (
            <div className="auth-component">
                <Link to="auth/login" activeClassName='active'>Login</Link>
                <Link to="auth/register" activeClassName='active'>Register</Link>
                {this.props.children || <Login/>}
            </div>
        )
    }
});

module.exports = Auth;

