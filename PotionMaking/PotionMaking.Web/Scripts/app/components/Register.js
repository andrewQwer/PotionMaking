'use strict';

var React = require('react');

var Register = React.createClass({
    render: function () {
        return (
            <div className="register-component">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Repeat Password</label>
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

