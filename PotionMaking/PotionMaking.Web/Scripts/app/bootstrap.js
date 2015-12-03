'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

/* toastr options */
toastr.options.preventDuplicates = true;

/* pre loads */
var UserStore = require('./stores/UserStore');

UserStore.loadUser(function(){
    debugger
    /* routes */
    var Route = require('react-router').Route;
    var IndexRoute = require('react-router').IndexRoute;
    var NotFound = require('./components/NotFound');
    var App = require('./components/App');
    var Index = require('./components/Index');
    var Login = require('./components/Login');
    var Auth = require('./components/Auth');
    var Register = require('./components/Register');
    var RegisterSuccess = require('./components/RegisterSuccess');
    var Router = require('react-router').Router;
    var browserHistory = require('history/lib/createBrowserHistory');
    var hooks = require('./utils/routeHooks');
    var config = require('./config');

    ReactDOM.render(
        <Router history={browserHistory()}>
            <Route path={config.LocalUrl.Root} component={Index}>
                <IndexRoute component={App} onEnter={hooks.checkAuthorized}/>
                <Route component={Auth}>
                    <Route path={config.LocalUrl.Login} component={Login} onEnter={hooks.checkAnonymous}/>
                    <Route path={config.LocalUrl.Logout} onEnter={hooks.logout}/>
                    <Route path={config.LocalUrl.Register} component={Register} onEnter={hooks.checkAnonymous}/>
                    <Route path={config.LocalUrl.RegisterSuccess} component={RegisterSuccess} onEnter={hooks.checkRegistrationToken}/>
                </Route>
            </Route>
            <Route path="*" component={NotFound} />
        </Router>,
        document.getElementById('pm-app'));
});

