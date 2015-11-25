    'use strict';
    var React = require('react');
    var ReactDOM = require('react-dom');
    var App = require('./components/App');
    var Index = require('./components/Index');
    var About = require('./components/About');
    var Login = require('./components/Login');
    var Auth = require('./components/Auth');
    var Register = require('./components/Register');

    var Router = require('react-router').Router;
    var Route = require('react-router').Route;
    var auth = require('./auth')

function requireAuth(nextState, replaceState) {
    if (!auth.loggedIn())
        replaceState({ nextPathname: nextState.location.pathname }, '/login')
}

ReactDOM.render((
    <Router>
        <Route path="/" component={Index}>
            <Route path="app" component={App} onEnter={requireAuth} />
            <Route path="auth" component={Auth}>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </Route>
            <Route path="about" component={About}/>
        </Route>
    </Router>
), document.getElementById('pm-app'));
