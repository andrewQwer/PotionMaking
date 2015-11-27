var TokenStore = require('../stores/TokenStore');

var hooks = {
    checkRegistrationToken: function (nextState, replaceState) {
        var token = nextState.location.query.rt;
        var lastRegToken = TokenStore.getLastRegistrationToken();
        if (token !== lastRegToken) {
            replaceState(null, '/register')
        } else {
            TokenStore.clearRegistrationToken();
        }
    }
}
module.exports = hooks;
