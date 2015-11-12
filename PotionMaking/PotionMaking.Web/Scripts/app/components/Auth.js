'use strict';

var React = require('react');
var Link = require('react-router').Link;
var Login = require('./Login');

var Auth = React.createClass({
    render: function () {
        return (
            <div className="auth-component">
                <Link to="/login" activeClassName='active'>Login</Link>
                <Link to="/register" activeClassName='active'>Register</Link>
                {this.props.children}
            </div>
        )
    }
});

module.exports = Auth;

