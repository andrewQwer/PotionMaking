'use strict';

var React = require('react');
var Link = require('react-router').Link;
var auth = require('../auth')
var App = React.createClass({
    getInitialState() {
        return {
            loggedIn: auth.loggedIn()
        }
    },

    updateAuth(loggedIn) {
        this.setState({
            loggedIn: loggedIn
        })
    },

    componentWillMount() {
        auth.onChange = this.updateAuth
        //auth.login()
    },
    render: function () {
        return (
            <div>
                <ul>
                    <li>
                        {this.state.loggedIn ? (
                            <Link to="/logout">Log out</Link>
                        ) : (
                            <Link to="/login">Sign in</Link>
                        )}
                    </li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link> (authenticated)</li>
                </ul>
                {this.props.children}
            </div>
        )
    }
})

module.exports = App;