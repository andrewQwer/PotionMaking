'use strict';

var React = require('react');
var App = require('./App');
var About = require('./About');
var Router = require('react-router');
var Route = Router.Route;

var routes = (
    <Route path="/" handler={App}>
        <Route path="about" handler={About}/>
    </Route>
);

Router.run(routes, Router.HashLocation, function(Root) {
    React.render(<Root/>, document.getElementById('pm-app'));
});

