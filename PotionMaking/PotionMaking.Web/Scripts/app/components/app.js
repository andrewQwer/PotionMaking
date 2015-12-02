'use strict';

var React = require('react');
var Link = require('react-router').Link;
var App = React.createClass({
    render: function () {
        return (
            <div>
               This is inner app
                <br/>
                <Link to="/logout">Выйти</Link>
            </div>
        )
    }
})

module.exports = App;