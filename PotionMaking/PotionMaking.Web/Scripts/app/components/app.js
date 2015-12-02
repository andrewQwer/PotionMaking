'use strict';

var React = require('react');
var Link = require('react-router').Link;
var config = require('../config');

var App = React.createClass({
    render: function () {
        return (
            <div>
                <h3>Здесь будет содержимое страницы</h3>
                <Link to={config.LocalUrl.Logout}>Выйти</Link>
            </div>
        )
    }
})

module.exports = App;