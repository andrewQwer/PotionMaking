'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var auth = require('./auth')
var routes = require('./routes/routes');

/* toastr options */
toastr.options.preventDuplicates = true;
/*****************/

ReactDOM.render(routes, document.getElementById('pm-app'));
