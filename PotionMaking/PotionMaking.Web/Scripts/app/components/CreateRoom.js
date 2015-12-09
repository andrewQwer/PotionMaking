'use strict';

var React = require('react');
var config = require('../config');
var RoomActions = require('../actions/RoomActions');

var createRoom = React.createClass({
    getInitialState: function () {
        return {isPrivate: false};
    },
    privateChanged: function () {
        this.setState({isPrivate: !this.state.isPrivate});
    },
    createRoom:function(){
        if ($('#create-room-form').valid()){
            var roomData = {
                playersNumber: this.refs.players.value,
                isPrivate: this.state.isPrivate,
                password: this.state.isPrivate ? this.refs.password.value : ''
            }
            $(this.refs.submitBtn).button('loading');
            RoomActions.createRoom(roomData);
        } else{
            toastr.error(config.Messages.FillInputs);
        }
    },
    componentDidMount:function(){
        var validation = $.extend({}, {
            rules: {
                'players-number': {required: true, digits: true, range:[2,4]},
                'room-pass': {required: true, minlength: 6}
            }
        }, config.Validation.CreateRoom);
        $('#create-room-form').validate(validation);
    },
    render: function () {
        return (
            <div className="create-room-component">
                <form id="create-room-form" className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="players-number" className="col-sm-2 control-label">Количество игроков</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   className="form-control"
                                   id="players-number"
                                   name="players-number"
                                   defaultValue="2"
                                   ref="players"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" checked={this.state.isPrivate}
                                           onClick={this.privateChanged}/> Приватная комната
                                </label>
                            </div>
                        </div>
                    </div>
                    {this.state.isPrivate ?
                        <div className="form-group">
                            <label htmlFor="room-pass" className="col-sm-2 control-label">Пароль к комнате</label>
                            <div className="col-sm-10">
                                <input type="password"
                                       className="form-control"
                                       id="room-pass"
                                       name="room-pass"
                                       ref="password"
                                />
                            </div>
                        </div>
                        : ''}
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <input type="button"
                                   ref="submitBtn"
                                   className="btn btn-default"
                                   data-loading-text="Создание комнаты..."
                                   value="Создать"
                                   onClick={this.createRoom}
                            />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
})

module.exports = createRoom;