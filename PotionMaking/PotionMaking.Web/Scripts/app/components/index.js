'use strict';

var React = require('react');

var Index = React.createClass({
    render:function(){
        return (
            <div className="pm-app">
                <div>Зельеварение</div>
                {this.props.children}
            </div>
        )
    }
});

module.exports = Index;

