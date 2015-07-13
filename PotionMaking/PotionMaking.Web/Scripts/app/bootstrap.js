'use strict';
var React = require('react');
var App = require('./components/App');
var Index = require('./components/Index');
var About = require('./components/About');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var history = require('../../node_modules/react-router/lib/HashHistory').history;

function requireAuth(nextState, transition){
    transition.to('/about', null, { nextPathname: nextState.location.pathname });
}
React.render((
    <Router history={history}>
        <Route path="/" component={Index}>
            <Route path="app" component={App}  onEnter={requireAuth}/>
            <Route path="about" component={About}/>
        </Route>
    </Router>
), document.body);
