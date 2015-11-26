'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');
var Index = require('./components/Index');
var About = require('./components/About');
var Login = require('./components/Login');
var Auth = require('./components/Auth');
var Register = require('./components/Register');
var RegisterSuccess = require('./components/RegisterSuccess');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var auth = require('./auth')
var browserHistory = require('history/lib/createBrowserHistory');
var TokenStore = require('./stores/TokenStore');

function requireAuth(nextState, replaceState) {
    if (!auth.loggedIn())
        replaceState({nextPathname: nextState.location.pathname}, '/login')
}

function checkRegistrationToken(nextState, replaceState) {
    var token = nextState.location.query.rt;
    var lastRegToken = TokenStore.getLastRegistrationToken();
    if (token !== lastRegToken) {
        replaceState(null, '/register')
    } else {
        TokenStore.clearRegistrationToken();
    }
}
/* toastr options */
toastr.options.preventDuplicates = true;
/*****************/

ReactDOM.render((
    <Router history={browserHistory()}>
        <Route path="/" component={Index}>
            <Route path="app" component={App} onEnter={requireAuth}/>
            <Route path="auth" component={Auth}>
                <IndexRoute component={Login}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/registerSuccess" component={RegisterSuccess} onEnter={checkRegistrationToken}/>
            </Route>
            <Route path="about" component={About}/>
        </Route>
    </Router>
), document.getElementById('pm-app'));
