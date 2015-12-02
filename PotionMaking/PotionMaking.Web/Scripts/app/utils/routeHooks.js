var TokenStore = require('../stores/TokenStore');
var config = require('../config');

var hooks = {
    checkRegistrationToken: function (nextState, replaceState) {
        var token = nextState.location.query.rt;
        var lastRegToken = TokenStore.getLastRegistrationToken();
        if (token !== lastRegToken) {
            replaceState(null, config.LocalUrl.Register);
        } else {
            TokenStore.clearRegistrationToken();
        }
    },
    checkAuthorized: function (nextState, replaceState) {
        var token = TokenStore.getAuthToken();
        if (!token) {
            replaceState({ nextPathname: nextState.location.pathname }, config.LocalUrl.Login)
        }
    },
    checkAnonymous: function (nextState, replaceState) {
        var token = TokenStore.getAuthToken();
        if (token) {
            replaceState(null, config.LocalUrl.Root);
        }
    },
    logout: function (nextState, replaceState) {
        TokenStore.clearAuthToken();
        replaceState(null, config.LocalUrl.Login)
    }
}
module.exports = hooks;
