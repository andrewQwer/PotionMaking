'use strict';

var React = require('react');
var Link = require('react-router').Link;
var config = require('../config');

var Auth = React.createClass({
    render: function () {
        return (
            <div className="auth-component">
                <Link to={config.LocalUrl.Login} activeClassName='active'>Войти</Link>
                <Link to={config.LocalUrl.Register} activeClassName='active'>Зарегестрироваться</Link>
                {this.props.children}
            </div>
        )
    }
});

module.exports = Auth;

