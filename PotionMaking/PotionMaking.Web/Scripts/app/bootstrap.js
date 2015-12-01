'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

/* toastr options */
toastr.options.preventDuplicates = true;

/* routes */
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var About = require('./components/About');
var App = require('./components/App');
var Index = require('./components/Index');
var Login = require('./components/Login');
var Auth = require('./components/Auth');
var Register = require('./components/Register');
var RegisterSuccess = require('./components/RegisterSuccess');
var Router = require('react-router').Router;
var browserHistory = require('history/lib/createBrowserHistory');
var hooks = require('./utils/routeHooks');

ReactDOM.render(
<Router history={browserHistory()}>
    <Route path="/" component={Index} onEnter={hooks.checkAuthorized}>
        <Route path="app" component={App}/>
        <Route path="about" component={About}/>
    </Route>
    <Route path="/auth" component={Auth}>
        <IndexRoute component={Login}/>
        <Route path="/login" component={Login} onEnter={hooks.checkAnonymous}/>
        <Route path="/logout" onEnter={hooks.logout}/>
        <Route path="/register" component={Register} onEnter={hooks.checkAnonymous}/>
        <Route path="/registerSuccess" component={RegisterSuccess} onEnter={hooks.checkRegistrationToken}/>
    </Route>
</Router>,
document.getElementById('pm-app'));
