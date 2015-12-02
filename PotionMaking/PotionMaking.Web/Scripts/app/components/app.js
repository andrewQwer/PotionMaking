'use strict';

var React = require('react');
var Link = require('react-router').Link;
var config = require('../config');

var App = React.createClass({
    render: function () {
        return (
            <div>
               This is inner app
                <br/>
                <Link to={config.LocalUrl.Logout}>Выйти</Link>
            </div>
        )
    }
})

module.exports = App;