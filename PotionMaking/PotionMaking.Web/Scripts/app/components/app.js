'use strict';

var React = require('react');
var Link = require('react-router').Link;
var config = require('../config');
var UserStore = require('../stores/UserStore');

var App = React.createClass({
    render: function () {
        return (
            <div>
                <h3>Здесь будет содержимое страницы</h3>
                Привет, {UserStore.getCurrentUser().username}
                <Link to={config.LocalUrl.Logout}>Выйти</Link>
            </div>
        )
    }
})

module.exports = App;