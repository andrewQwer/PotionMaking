    'use strict';
var React = require('react');

var App = require('./components/App');
var Index = require('./components/Index');
var About = require('./components/About');
var Login = require('./components/Login');
var Auth = require('./components/Auth');
var Register = require('./components/Register');


var Router = require('react-router').Router;
var Route = require('react-router').Route;

React.render((
    <Router>
        <Route path="/" component={Index}>
            <Route path="app" component={App} />
            <Route path="auth" component={Auth}>
                <Route path="login" component={Login}/>
                <Route path="register" component={Register}/>
            </Route>
            <Route path="about" component={About}/>
        </Route>
    </Router>
), document.body);
