'use strict';

var React = require('react');
var Link = require('react-router').Link;
var config = require('../config');
var UserStore = require('../stores/UserStore');

var App = React.createClass({
    render: function () {
        return (
            <div>
                <div>Привет>Привет, {UserStore.getCurrentUser().username}</div>
                <Link to={config.LocalUrl.GameRoom}>Игровой зал</Link>
                <Link to={config.LocalUrl.CreateRoom}>Создать игру</Link>
                <Link to={config.LocalUrl.Logout}>Выйти</Link>
                {this.props.children}
            </div>
        )
    }
})

module.exports = App;