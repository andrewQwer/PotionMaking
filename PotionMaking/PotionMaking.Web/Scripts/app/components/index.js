'use strict';

var React = require('react');

var Index = React.createClass({
    render:function(){
        return (
            <div className="pm-app">
                <h1>Зельеварение</h1>
                {this.props.children}
            </div>
        )
    }
});

module.exports = Index;

