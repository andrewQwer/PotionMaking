'use strict';

var React = require('react');
var App = require('./App');
var About = require('./About');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var Index = React.createClass({
    render:function(){
        return <div><RouteHandler/></div>
    }
});

var routes = (
    <Route ath="/" handler={Index}>
        <DefaultRoute handler={App}/>
        <Route path="about" handler={About}/>
    </Route>
);

Router.run(routes, Router.HashLocation, function(Root) {
    React.render(<Root/>, document.getElementById('pm-app'));
});

