
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var browserHistory = require('history/lib/createBrowserHistory');
var About = require('../components/About');
var App = require('../components/App');
var Index = require('../components/Index');
var Login = require('../components/Login');
var Auth = require('../components/Auth');
var Register = require('../components/Register');
var RegisterSuccess = require('../components/RegisterSuccess');
var hooks = require('./routeHooks');

module.export =
<Router history={browserHistory()}>
    <Route path="/" component={Index}>
        <Route path="app" component={App}/>
        <Route path="auth" component={Auth}>
            <IndexRoute component={Login}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/registerSuccess" component={RegisterSuccess} onEnter={hooks.checkRegistrationToken}/>
        </Route>
        <Route path="about" component={About}/>
    </Route>
</Router>
