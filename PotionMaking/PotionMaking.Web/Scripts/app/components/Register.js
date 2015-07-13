'use strict';

var React = require('react');

var Register = React.createClass({
    render: function () {
        return (
            <div className="register-component">
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Repeat Password</label>
                        <input type="password" className="form-control" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-default">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
});

module.exports = Register;

