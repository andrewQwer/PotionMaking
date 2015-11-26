'use strict';

var React = require('react');

var RegisterSuccess = React.createClass({
    render: function () {
        return (
            <div className="alert alert-success" role="alert">
                <strong>Отлично!</strong>
                Вы успешно зарегестрировались в системе. На ваш email будут высланы дальнейшие инструкции.
            </div>
        )
    }
});

module.exports = RegisterSuccess;

